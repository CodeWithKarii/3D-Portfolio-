from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/portfolio")
def portfolio():
    return render_template("portfolio.html")

@app.route("/go-home")
def go_home():
    return redirect(url_for("home"))

@app.route("/go-portfolio")
def go_portfolio():
    return redirect(url_for("portfolio"))

if __name__ == "__main__":
         app.run(host='0.0.0.0', port=80)


