from flask import Flask,jsonify,request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
import datetime

app = Flask(__name__)

app.config ['SQLALCHEMY_DATABASE_URI']='postgresql://savannahhackme2023_user:8CIAHMNm0x95MixXNKlvBsdukKTjx2kT@dpg-clg6kqer45ec73elqm00-a.oregon-postgres.render.com/savannahhackme2023'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

db = SQLAlchemy(app)
ma = Marshmallow(app)

migrate = Migrate(app, db) 

class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    title = db.Column(db.Text())
    date = db.Column(db.DateTime, default=datetime.datetime.now)
    
    def __init__(self, title, body):
        self.title = title
        self.body = body

class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id','title','body','date')

article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)

@app.route('/create', methods= ['POST'])
def addArticle():
    title = request.json ['title']
    body = request.json ['body']
    
    articles = Article(title,body)
    db.session.add(articles)
    db.session.commit()
    return article_schema.jsonify(articles)

@app.route('/home', methods= ['GET'])
def home():
    all_articles = Article.query.all()
    results = articles_schema.dump(all_articles)
    return jsonify(results)
    # return jsonify({"Hello":"World"})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)