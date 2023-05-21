from flask_api import status
from email_validator import validate_email, EmailNotValidError


# Data models

class LoginRequestDataModel:
    def __init__(self, user):
        self.username = user.get("username")
        self.password = user.get("password")
        self.error_message = None
        self.validate()

    def validate(self):
        try:
            if not self.username or not isinstance(self.username, str) or len(self.username) < 3:
                raise ValueError("Invalid username.")

            if not self.password or not isinstance(self.password, str) or len(self.password) < 8:
                raise ValueError("Invalid password. Password must be at least 8 characters.")
        
        except ValueError as e:
            self.error_message = str(e)
    
    def isValid(self):
        return self.error_message is None
    
class UserLoginResultDataModel:
    def __init__(self, user_logged, username, message, error, user_id = 0):
        self.user_logged = user_logged
        self.username = username
        self.user_id = user_id
        self.message = message
        self.error = error
        

class SignupRequestDataModel:
    def __init__(self, user):
        self.username = user.get("username")
        self.password = user.get("password")
        self.first_name = user.get("first_name")
        self.last_name = user.get("last_name")
        self.email = user.get("email")
        self.error_message = None
        self.validate()

    def validate(self):
        try:
            if not self.username or not isinstance(self.username, str) or len(self.username) < 3:
                raise ValueError("Invalid username.")

            if not self.password or not isinstance(self.password, str) or len(self.password) < 8:
                raise ValueError("Invalid password. Password must be at least 8 characters.")
            
            if not self.first_name or not isinstance(self.first_name, str) or len(self.first_name) < 1:
                raise ValueError("Invalid first name.")
            
            if not self.last_name or not isinstance(self.last_name, str) or len(self.last_name) < 1:
                raise ValueError("Invalid last name.")
            
            # Validate email
            if not self.email or not isinstance(self.email, str):
                raise ValueError("Invalid email.")

            try:
                # Validate the email
                v = validate_email(self.email)
            except EmailNotValidError as e:
                # email is not valid, exception message is human-readable
                raise ValueError(str(e))
            
        except ValueError as e:
            self.error_message = str(e)
            
    def isValid(self):
        return self.error_message is None
    
    
class UserSignupResultDataModel:
    def __init__(self, user_created, message, error, user_id = 0):
        self.user_created = user_created
        self.user_id = user_id
        self.message = message
        self.error = error
        
        
class CheckUserSessionResultDataModel:
    def __init__(self, session_valid, username, user_id = 0):
        self.session_valid = session_valid
        self.username = username
        self.user_id = user_id
        
    def to_dict(self):
        return {"session_valid": self.session_valid, "username": self.username, "user_id": self.user_id}
    
class CreateUserSessionResultDataModel:
    def __init__(self, guid):
        self.guid = guid
        


# Response Models


class LoginResponseModel:
    def __init__(self, user, session_guid=None):
        self.message = user.message
        self.error = user.error
        self.user_id = user.user_id
        self.username = user.username
        self.session_guid = session_guid
        
    def to_dict(self):
        return{
            "message": self.message,
            "error": self.error,
            "user_id": self.user_id,
            "username": self.username,
            "session_guid": self.session_guid
        }
    
    
    
class SignupResponseModel:
    def __init__(self, user):
        self.message = user.message
        self.error = user.error
        self.user_id = user.user_id
        
        
    def to_dict(self):
        return {"message": self.message, "error": self.error, "user_id": self.user_id}
    

class SignoutResponseModel:
    def __init__(self, signout_status, message):
        self.signout_status = signout_status
        self.message = message

    def to_dict(self):
        return {
            "signout_status": self.signout_status,
            "message": self.message
        }

class TaskResponseModel:
    def __init__(self, task_id, title, user_id, categories, section_status, reminder = None, created_at = None, updated_at = None):
        self.id = task_id
        self.title = title
        self.user_id = user_id
        self.categories = categories.split(", ") if isinstance(categories, str) else categories
        self.section_status = section_status
        self.reminder = reminder
        self.created_at = created_at
        self.updated_at = updated_at
        
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "user_id": self.user_id,
            "categories": self.categories,
            "section_status": self.section_status,
            "reminder": self.reminder,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

class JournalResponseModel:
    def __init__(self, initial_moods, id, resulted_mood, created_at):
        self.id = id
        self.initial_moods = initial_moods
        self.resulted_mood = resulted_mood
        self.created_at = created_at

    def to_dict(self):
        return {
            "id": self.id,
            "initial_moods": self.initial_moods,
            "resulted_mood": self.resulted_mood,
            "created_at": self.created_at,
        }

