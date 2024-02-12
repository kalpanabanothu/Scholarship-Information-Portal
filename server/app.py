import requests
from bs4 import BeautifulSoup
from flask import Flask, render_template, Response, jsonify, request
import gunicorn
import os
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)


class StateScheme:
    def __init__(
        self,
        name,
        closing_date,
        verification_date,
        institution,
        verification,
        guidelines,
        faq,
        state,
    ):
        self.name = name
        self.closing_date = closing_date
        self.verification_date = verification_date
        self.institution = institution
        self.verification = verification
        self.guidelines = guidelines
        self.faq = faq
        self.state = state


def scrape_scholarships(url):
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception(f"Error: {response.status_code}")
    soup = BeautifulSoup(response.content, "html.parser")
    scholarship_items = soup.find_all("a", class_="nav-link")
    state_schemes_div = soup.find("div", id="stateSchemes")
    accordion_divs = state_schemes_div.select("#accordion11 > div > div")
    state_scheme_list = []
    for i in range(1, len(accordion_divs), 2):
        s = 1
        even_div = accordion_divs[i]
        table_tag = even_div.find("table")
        if table_tag:
            tbody_tag = table_tag.find("tbody")
            if tbody_tag:
                td_tags = tbody_tag.find_all("td")
                values = []
                for td_tag in td_tags:
                    a_tag = td_tag.find("a")
                    if a_tag:
                        values.append(
                            f'https://www.scholarships.gov.in{a_tag.get("href")}'
                        )
                    else:
                        values.append(td_tag.text.strip())
                    if s % 7 == 0:
                        state_name = values[0].split("-")[-1].strip()
                        values.append(state_name)
                        data = StateScheme(*values)
                        state_scheme_list.append(data)
                        values = []
                    s += 1
    return state_scheme_list

    types = []
    for item in scholarship_items:
        title = item.text.strip()
        types.append(title)


@app.route("/fetch", methods=["POST"])
def fetch_scholaships():
    url = "https://scholarships.gov.in/#skipcontent"
    state_scheme_list = scrape_scholarships(url)
    df = pd.DataFrame([vars(state_scheme) for state_scheme in state_scheme_list])
    csv_file_path = "..\\frontend\\\src\\authentication\\scholarships.csv"
    df.to_csv(csv_file_path, index=False)
    return jsonify({"message": "Data written to CSV successfully"})
