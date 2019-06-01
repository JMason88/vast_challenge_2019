import numpy as np 
import pandas as pd 

static = pd.read_csv(
    '../../data/StaticSensorReadings.csv'
)

print(static.head())

static.Timestamp = pd.to_datetime(static.Timestamp)
static['day'] = pd.Series([x.day for x in static.Timestamp])
static['hour'] = pd.Series([x.hour for x in static.Timestamp])
static['minute'] = pd.Series([x.minute for x in static.Timestamp])

static = static.set_index(pd.DatetimeIndex(static.Timestamp))

print(static.head())

static = static.groupby([pd.Grouper(freq='1min'),'Sensor-id']).agg({'Value':'median'})

print(static.head())


