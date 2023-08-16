from pathlib import Path
from flask import Flask,render_template,request
import spacy
from difflib import SequenceMatcher
import pandas as pd
import os
import csv
import datetime

excel_path1=Path(__file__).parent
excel_path2=excel_path1/"UserRecord.csv"
excel_path=excel_path1/"Carrey_Inputs.csv"

    
app = Flask(__name__)
app.static_folder = 'static'

def RecordQury(text,commant,UserToBotDB,userIP):
    DateTime=datetime.datetime.now()
    Time=DateTime.strftime("%H:%M:%S")
    Date=DateTime.strftime("%d-%m-%Y")
    f=open(UserToBotDB,'a',newline='')
    rdata=csv.writer(f)
    rdata.writerow([Date,Time,commant,text,userIP])
    f.close()


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get")
def get_bot_response():
    df=pd.read_csv(excel_path,encoding="ISO-8859-1")
    df=df.to_dict(orient="list")
    nlp=spacy.blank("en")
    keywords=list(df.keys())
    keywords= sorted(keywords, key=len)
    userIP=request.remote_addr
    commant= request.args.get('msg')
    commant=commant.lower()
    doc=nlp(commant)
    pointlist=[]
    for key in keywords:
        listkey=nlp(key)
        tpoint=0
        for subkey in listkey:
            for subinput in doc:
                a=str(subkey)
                b=str(subinput)
                point=SequenceMatcher(None,a,b).ratio()
                if point>=0.7:
                    tpoint=tpoint+point
                else:
                    continue
        pointlist.append(tpoint)
    duplicatepointlist=[]
    duplicatepointlist=pointlist.copy()
    duplicatepointlist.sort(reverse=True)
    KeywordsNo=pointlist.index(duplicatepointlist[0])
    if (duplicatepointlist[0]>=0.9):
        text=df[keywords[KeywordsNo]]
        text=text[0]
    else:
        text='Sorry'
    RecordQury(text,commant,excel_path2,userIP)
    return str(text)
if __name__ == "__main__":
    app.run()
