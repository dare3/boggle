from boggle import Boggle
from flask import Flask, session,flash, render_template,request,jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = 'wordapp23'

debug = DebugToolbarExtension(app)
boggle_game = Boggle()

@app.route('/')
def display_home_page():
    """display home page and data to be stored in sessions"""
    board = boggle_game.make_board();
    session['board'] = board
    highscore = session.get('highscore', 0)
    num_played = session.get('num_played', 0)

    return render_template('index.html', board = board, highscore=highscore, num_played=num_played)

@app.route('/look-word', methods=['POST'])
def look_word():
    """this will hold the submission of word"""

    word = request.json['word']
    board = session['board']
    result = boggle_game.check_valid_word(board, word)

    return jsonify({'result': result})

@app.route('/update-score', methods =['POST'])
def score_update():
    """retriving score & updating scoreboard"""
    score = request.json['score']
    highscore = session.get('highscore', 0)
    num_played= session.get('num_played', 0)

    session["num_played"] = num_played + 1
    session["highscore"] = max(score,highscore)
    
    return jsonify(newScore = score > highscore)