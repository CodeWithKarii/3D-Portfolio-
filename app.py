from flask import Flask, render_template, redirect, url_for, request, flash
import sqlite3
from hidden import key

app = Flask(__name__)
app.secret_key = key  # Needed for flash messages
DB_FILE = "users.db"

# Initialize the database
def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE
        )
    ''')
    conn.commit()
    conn.close()

init_db()  # Create the table if it doesn't exist

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/portfolio")
def portfolio():
    return render_template("portfolio.html")

@app.route("/go-home")
def go_home():
    return redirect(url_for("home"))

@app.route("/submit", methods=["POST"])
def submit():
    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip().lower()  # normalize email

    if not name or not email:
        flash("Name and email are required!")
        return redirect(url_for("home"))

    try:
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute("INSERT INTO users (name, email) VALUES (?, ?)", (name, email))
        conn.commit()
        conn.close()
        flash("Successfully registered!")

    except sqlite3.IntegrityError:
        flash("This email is already registered!", "error")
        return redirect(url_for("portfolio"))

    except Exception as e:
        print(f"Database error: {e}")
        flash("An unexpected error occurred. Please try again." , "error")
        return redirect(url_for("home"))

    return redirect(url_for("portfolio"))

# New route to view all users
@app.route("/users")
def users():
    try:
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute("SELECT name, email FROM users ORDER BY id ASC")
        users_list = c.fetchall()
        conn.close()
        return render_template("users.html", users=users_list)
    except Exception as e:
        print(f"Error fetching users: {e}")
        flash("Could not retrieve users.")
        return redirect(url_for("home"))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
