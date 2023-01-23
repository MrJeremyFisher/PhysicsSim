#!/usr/bin/python3
print("Content-Type: text/html\n\r\n")
import pandas as pd
import warnings
import plotly.express as px
from IPython.display import clear_output
import dash
from dash import dcc, html
from dash.dependencies import Input, Output
from waitress import serve
from datetime import datetime
from dateutil.relativedelta import relativedelta



warnings.simplefilter(action='ignore', category=FutureWarning)

URL = 'http://api.open-notify.org/iss-now.json'

# print("<form action=\"https://google.com\"> <input type=\"submit\" value=\"Go to Google\" /> </form>")

app = dash.Dash(__name__,
                meta_tags=[
                    {"name": "viewport", "content": "width=device-width, initial-scale=1"}
                ])


application = app.server

# 86BBBD

# config = {'responsive': True}
# autosize=True

app.layout = html.Div(
    html.Div([
        dcc.Graph(
            responsive=True,
            id='live-update-graph',
            # config={
            #     'displayModeBar': False,
            #     responsive:True
            # },
            style=dict(height='95vh', width='95vw'),
            figure=dict(layout=dict(autosize=True)),
            config=dict(responsive=True, displayModeBar=False),
        ),
        dcc.Interval(
            id='interval-component',
            interval=1*2000,  # in milliseconds
            n_intervals=0
        )
    ]),
)

df2 = pd.DataFrame()
df3 = pd.DataFrame()


def pullData(url):
    df = pd.read_json(url)
    global df2
    global df3

    df['Latitude'] = df.loc['latitude', 'iss_position']
    df['Longitude'] = df.loc['longitude', 'iss_position']
    df['Time'] = datetime.now()
    # print(df3['Time'])
    df.reset_index(inplace=True)
    df = df.drop(['message', 'index'], axis=1)
    df = df.drop(0)
    if len(df2) > 5000:
        df2 = df2.iloc[1:, :]
    df2 = df2.append(df)
    df3 = df2
    df3['colours'] = df3['Time'].apply(lambda x: '#eb3434' if x>=datetime.now()-relativedelta(seconds=2.1) else ('#303030' if x<=datetime.now() else 1))
    df3['size'] = df3['Time'].apply(lambda x: 20 if x>=datetime.now()-relativedelta(seconds=2.1) else (5 if x<=datetime.now() else 1))
    # print(df3)
    return df3


df3 = pullData(URL)

# print(df['Latitude'])
fig = px.scatter_geo(df3, lat='Latitude', lon='Longitude',
                     projection='natural earth', color='Time')


# center=dict(lat=df['Latitude'][1], lon=df['Longitude'][1])



fig.update_layout(margin=dict(l=0, r=0, t=0, b=0),
                  paper_bgcolor='rgba(0,0,0,0)', plot_bgcolor='rgba(0,0,0,0)', showlegend=False)
fig.update_geos(showcoastlines=True, coastlinecolor='white', showland=True,
                showocean=True, oceancolor='#064273', showcountries=False, resolution=110)

fig['layout']['uirevision'] = 'some_value'


@app.callback(Output('live-update-graph', 'figure'), Input('interval-component', 'n_intervals'))
def updateGraph(n):

    df3 = pullData(URL)
    clear_output(wait=True)

    fig.update_traces(
        lat=df3['Latitude'], lon=df3['Longitude'], marker=dict(color=df3['colours'], size=df3['size']), marker_line=dict(width=2, color=df3['colours']))
    # print(df3['Longitude'])

    # fig.update_geos(projection_rotation=dict(lat=df['Latitude'][1], lon=df['Longitude'][1]))

    # dsp = dcc.Graph(figure=fig, responsive=True)

    return fig


if __name__ == '__main__':
    serve(application)
    # app.run(port='8050', host='')
