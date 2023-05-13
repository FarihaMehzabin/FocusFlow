from hashing import Hashing
from models import (
    UserLoginResultDataModel, UserSignupResultDataModel, CreateUserSessionResultDataModel, CheckUserSessionResultDataModel
)
from db import UserDB, UserSessionDB

import uuid
from hashing import Hashing
from flask import make_response, render_template, url_for, request, jsonify



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
        rowcount, id = self.user_db.create_user(user)

        if rowcount:
            response = UserSignupResultDataModel(rowcount, f"New user signed up! Welcome :)", False, id)
            print(response.error)
            
        else:
            response = UserSignupResultDataModel(False, "Username taken. Please try again.", True)

        return response
        

class UserSignoutService:
    def __init__(self):
        self.user_session_db = UserSessionDB()

    def user_signout(self, guid):
        # Remove session associated with the guid
        signout_status = self.user_session_db.remove_session(guid)
        if signout_status:
            response = SignoutResponseModel(True, "User signed out successfully.")
        else:
            response = SignoutResponseModel(False, "Signout unsuccessful. Please try again.")
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