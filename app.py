import tensorflow as tf
from flask import Flask, request
from flask_cors import CORS

from predict import violence_nodel
from predict import main_fight
from split import video_splitter
import os


app = Flask(__name__)
CORS(app,resources={r"/*": {"origins": "*"}})
@app.route("/",methods = ['POST'])
def home():
    if request.form['type'] == 'violence':
        model = violence_nodel(tf)
        print(model.summary())
        print('model loading completed')
        print(request.form)
        video_splitter(request.form['path'])
        files = os.listdir('segments/')
        files.pop()
        # res = []
        # for i in files:
        #     print(i)
        #     res.append(main_fight(f'segments/{i}'))
        return files 
@app.route("/segment",methods=['POST'])
def segment():
    seg = request.form['segment']
    return main_fight(f'segments/{seg}')
    
if __name__ == "__main__":
    app.run(debug=True)   