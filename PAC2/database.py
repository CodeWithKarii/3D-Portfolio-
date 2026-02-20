
class db :
    def __init__(self,id,name,email):
         self.id = int(id)  
         self.name = str(name)
         self.email = str(email) 

    def recored(self):
        user = print(f"ID: {self.id}, Name: {self.name}, Email: {self.email}")
        return user


    def getemail(self):
        email =  print(self.email)
        return email
    def getname(self):
        name = print(self.name)

        return name  