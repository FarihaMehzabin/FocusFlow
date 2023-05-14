from db_functions import DbFunctions 
from hashing import Hashing
import traceback

class UserDB:
    def __init__(self):
        self.db = DbFunctions()
        self.hash = Hashing()

    # Get user by username
    def get_user_by_username(self, username):
        res = self.db.fetch(f"SELECT * FROM users WHERE username = '{username}'")
        return res[0] if res else None

    # Create a new user with the provided user information
    def create_user(self, user):
        try:
            hashed_pass = self.hash.hash_pass(user.password)

            rowcount, id = self.db.insert(
                f"INSERT INTO users (username, first_name, last_name, email, password) VALUES (%s, %s, %s, %s, %s)",
                (user.username, user.first_name, user.last_name, user.email, hashed_pass),
            )
            return rowcount, id
        
        except Exception as err:
            print(traceback.format_exc())
            print(f"{err}")
            return None, None
    
    
class UserSessionDB:
    def __init__(self):
        self.db = DbFunctions()

    # Create a new session with the provided hashed GUID and user ID
    def create_session(self, hashed_guid, user_id):
        try:
            self.db.insert(
                f"INSERT INTO session (guid, user_id) VALUES (%s, %s)", (hashed_guid, user_id)
            )
            return True
        except Exception as err:
            print(traceback.format_exc())
            print(f"{err}")
            return False

    # Get session details by GUID
    def get_session_by_guid(self, guid):
        res = self.db.fetch(
            f"SELECT guid, user_id FROM session WHERE guid = '{guid}'"
        )
        return res[0] if res else None

    # Get user details by user ID
    def get_user_by_id(self, user_id):
        res = self.db.fetch(
            f"SELECT first_name, last_name FROM users WHERE id = '{user_id}'"
        )
        return res[0] if res else None
    
    def remove_session(self, guid):
        try:
            rowcount = self.db.delete(
                f"DELETE FROM session WHERE guid = '{guid}'"
            )
            
            print("rowcount: {}".format(rowcount))
            
            print("guid: {}".format(guid))
            
            if rowcount: 
                return True
            
            return False
        
        except Exception as err:
            print(traceback.format_exc())
            print(f"{err}")
            return False

class TaskDB:
    def __init__(self):
        self.db = DbFunctions()
        
    def add_tasks(self, task):
        try:
            categories_str = ', '.join(task['categories'])
            response = self.db.insert(
                "INSERT INTO tasks (title, user_id, categories, section_status, reminder, created_at) VALUES (%s, %s, %s, %s, %s, %s)",
                (task['title'], task['user_id'], categories_str, task['section_status'], task['reminder']['date'], task['created_at'])
            )
        except Exception as e:
            print(traceback.format_exc())
            print("An error occurred: ", e)
            return False,
        return True, response[1]

        
    def get_tasks(self, user_id):
        try:
            response = self.db.fetch(
                f"SELECT * FROM tasks WHERE user_id = {user_id}"
            )
            
        except Exception as e:
            print("An error occurred: ", e)
            return False
        
        return response 
    
    def delete_task(self, task_id):
        try:
            
            response = self.db.delete(f"DELETE FROM tasks WHERE id = {task_id}")
        
        except Exception as e:
            print("An error occurred: ", e)
            return False
        
        return True
