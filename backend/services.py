from urllib import response
from hashing import Hashing
from models import (
    UserLoginResultDataModel, UserSignupResultDataModel, CreateUserSessionResultDataModel, CheckUserSessionResultDataModel, TaskResponseModel, JournalResponseModel
)
from db import UserDB, UserSessionDB, TaskDB, JournalDB

import uuid
from hashing import Hashing
from flask import make_response, render_template, url_for, request, jsonify
import traceback


class UserLoginService:
    def __init__(self):
        self.user_db = UserDB()
        self.hash = Hashing()

    def user_login(self, user):
        data = self.user_db.get_user_by_username(user.username)

        if data is not None:
            hash = data[3]
            
            response = UserLoginResultDataModel(
                self.hash.compare_pass(user.password, hash),
                user.username,
                f"Logged in! Welcome :) {user.username}",
                False,
                data[0],
            )
                        
            return response
        
        
        return UserLoginResultDataModel(
            False, "Invalid Credentials. Please try again.", True
        )


class UserSignupService:
    def __init__(self):
        self.user_db = UserDB()
        
    def user_signup(self, user):
        try:
            rowcount, id = self.user_db.create_user(user)

            if rowcount:
                response = UserSignupResultDataModel(rowcount, "New user signed up! Welcome :)", False, id)
                return {'status': 'success', 'data': response}

            else:
                response = UserSignupResultDataModel(False, "Username taken. Please try again.", True)
                return {'status': 'error', 'message': response.error}

        except Exception as e:
            print(traceback.format_exc())
            raise e  # re-raise the exception after logging it

        

class UserSignoutService:
    def __init__(self):
        self.user_session_db = UserSessionDB()

    def user_signout(self, guid):
        # Remove session associated with the guid
        signout_status = self.user_session_db.remove_session(guid)
        if signout_status:
            response = (True, "User signed out successfully.")
        else:
            response = (False, "Signout unsuccessful. Please try again.")
        return response



class SessionService:
    def __init__(self):
        self.hash = Hashing()
        self.user_session_db = UserSessionDB()

    def create_session(self, user_id):
        guid_id = str(uuid.uuid4())
        hashed_guid = self.hash.hash_guid(guid_id)

        if self.user_session_db.create_session(hashed_guid, user_id):
            
            response = CreateUserSessionResultDataModel(hashed_guid)
            
            return response
        else:
            
            return False

    def check_session_user(self, guid):
        data = self.user_session_db.get_session_by_guid(guid)

        if data:
            user_id = data[1]

            user_data = self.user_session_db.get_user_by_id(user_id)
            if user_data:
                response = CheckUserSessionResultDataModel(True, user_data[0] + user_data[1], user_id)
                return response

        return CheckUserSessionResultDataModel(False, 'No user found')
    
    
class CookieService:
    
    # Set a new cookie with the user_id as a parameter
    def set_cookie(self, guid):
        response = make_response()
        response.set_cookie("session", guid)
        return response

    # Check if a cookie is present in the request
    def get_cookie(self):
        name = request.cookies.get("session")
        if name is None:
            return False
        else:
            return request.cookies.get("session")

    def return_cookie(self, user_data):
        # Create a JSON response
        res = make_response(jsonify({"message": "Success"}), 200)

        # Set the cookie
        res.set_cookie('session', user_data.session_guid, samesite='None', path='/', secure = False)

        return res


class TaskService:
    def __init__(self) -> None:
        self.task_db = TaskDB()
        
    
    def get_tasks(self, user_id, section):
        response = self.task_db.get_tasks(user_id, section)
        
        tasks = [TaskResponseModel(*task).to_dict() for task in response]
        
        print(tasks)
        
        return tasks

        
    def add_tasks(self, task):
        
        response = self.task_db.add_tasks(task)
        
        if response[0]:
            return response[1]
        
        return False
    
    def delete_task(self, task_id):
        
        try:
        
            response = self.task_db.delete_task(task_id)
            
            if response:
                return True
            
            return False
        
        except Exception as e:
            print(traceback.format_exc())
            
    def update_task(self, task):
        try:
            
            response = self.task_db.update_task(task)
            
            if response:
                return True
            
            return False
        
        except Exception as e:
            print(traceback.format_exc())
    
    def change_sections(self,id,from_param,to_param):
        try:
            
            response = self.task_db.change_sections(id,from_param,to_param)
            
            if response:
                return True
            
            return False
        
        except Exception as e:
            print(traceback.format_exc())
            
    def mark_as_completed(self,id):
        try:
            
            response = self.task_db.mark_as_completed(id)
            
            if response:
                return True
            
            return False
        
        except Exception as e:
            print(traceback.format_exc())
            
class JournalService:
    def __init__(self) -> None:
        self.journal_db = JournalDB()
        
    
    def get_journals(self, user_id):
        response = self.journal_db.get_journals(user_id)
            
        print("Now i am in journal services, getting journals")
        
        # print("the entries are " ,response[1])
        
        journals = [JournalResponseModel(*journal).to_dict() for journal in response[1]]
        
        print(journals)
        
        return journals
    
    def get_journal_responses(self, id):
        response = self.journal_db.get_journal_responses(id)
            
        print("getting journal responses")
        
        print("the responses are " ,response)
        
        return response

        
    def add_journal(self, task):
        
        response = self.journal_db.add_journal(task)
        
        if response:
            return response
        
        return False
    
    def delete_task(self, task_id):
        
        try:
        
            response = self.task_db.delete_task(task_id)
            
            if response:
                return True
            
            return False
        
        except Exception as e:
            print(traceback.format_exc())
            
    def edit_journal_responses(self, id, edited_response):
        try:
            
            response = self.journal_db.update_journal(id, edited_response)
            
            if response:
                return True
            
            return False
        
        except Exception as e:
            print(traceback.format_exc())