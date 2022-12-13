import os
from dotenv import load_dotenv
from instadm import InstaDM

if __name__ == '__main__':
    load_dotenv()
    username = os.getenv('BOT_USERNAME')
    password = os.getenv('BOT_PASSWORD')
    target = os.getenv('TARGET_USERNAME')
    msg = "Hey!"
    # # Login
    # insta = InstaDM(username=username, password=password, headless=False)

    # # Send message
    # insta.sendMessage(user=target, message=msg)

    print("Sent message: " + msg)