import numpy as np 
import pandas as pd 

print(50 * '-')
print('Reading Mobile Sensor File Data...')
mob = pd.read_csv('../../data/MobileSensorReadings.csv')

print(50 * '-')
print('Pre Processing Mobile Sensor File Data... \n')
mob.Timestamp = pd.to_datetime(mob.Timestamp, format='%Y-%m-%d %H:%M:%S')
mob = mob[mob.Value>0]
mob.reset_index(drop=True, inplace=True)
mob = mob.set_index(pd.DatetimeIndex(mob['Timestamp']))
mob = mob.drop(['Timestamp','Units'], axis=1)
mob['Type'] = 'mobile'
mob.columns = ['Sensor-id','Long','Lat','Value','User-id','Type']
mob = mob.reindex(['Sensor-id','Long','Lat','Value','User-id','Type'], axis=1)
print(mob.head(10))

print(50 * '-')
print('Reading Fix Sensor File Data...')
fix_red = pd.read_csv('../../data/StaticSensorReadings.csv')

print(50 * '-')
print('Pre Processing Fix Sensor File Data... \n')

fix_red.Timestamp = pd.to_datetime(fix_red.Timestamp, format='%Y-%m-%d %H:%M:%S')
print(fix_red.head())

print(50 * '-')
print('Reading Fix Sensor Location Data... \n')
fix_loc = pd.read_csv('../../data/StaticSensorLocations.csv')
print(fix_loc.head())

print(50 * '-')
print('Merging Fix Sensor Data... \n')
fix = fix_red.merge(fix_loc, on='Sensor-id')
fix.reset_index(drop=True, inplace=True)
fix = fix.set_index(pd.DatetimeIndex(fix['Timestamp']))
fix = fix.drop(['Timestamp','Units'], axis=1)
fix['Type'] = 'fixed'
fix['User-id'] = 'Fixed-' + fix['Sensor-id'].astype(str)
fix = fix.reindex(['Sensor-id','Long','Lat','Value','User-id','Type'], axis=1)
print(fix.head())

print(50 * '-')
print('Unifying Mobile and Fix Sensor Data... \n')
#join everything
sensors = pd.concat([mob,fix])
print(sensors.head(10))

print(50 * '-')
print('Grouping results every 5 minutes... \n')
sensors_timed = sensors.groupby([pd.Grouper(freq='5min'),'Type','Sensor-id','User-id']).agg({'Value':'median','Lat':'median','Long':'median'})
sensors_timed['ts']=sensors_timed.index.get_level_values('Timestamp')
sensors_timed['type']=sensors_timed.index.get_level_values('Type')
sensors_timed['id']=sensors_timed.index.get_level_values('Sensor-id')
sensors_timed['name']=sensors_timed.index.get_level_values('Sensor-id').astype(str) + ' ' + sensors_timed.index.get_level_values('User-id')
sensors_timed.reset_index(drop=True,inplace=True)

print(sensors_timed.head(10))

print(50 * '-')
print('Saving results... \n')
sensors_timed.to_csv('salidas/sensors.csv')
print(43 * ' ' + '...DONE')
print(50 * '-')



