Declare @FechaD Datetime  = (Select MIN(timestamp) from StaticSensorReadings)
Declare @FechaH Datetime  = (Select max(timestamp) from StaticSensorReadings)
declare @segunos int = 600, @acum int= 0


Create table #Fechas (id int, fechaDesde DateTime , fechaHasta DateTime) 
while @FechaD <= @FechaH
begin
set @acum = @acum  +1
insert into #Fechas(id, fechaDesde, fechaHasta)
select @acum , CAST(@FechaD as datetime) , DATEADD(SS, @segunos-1, @FechaD)
set @FechaD = DATEADD(SS, @segunos, @FechaD)
end
Create Table #Mediciones (idSensor varchar(50), idToma int, inicioToma Datetime, duracionIntervalo int, Maximo Float, Minimo Float, Promedio Float , cantidad int, x float, y float, EsFijo int )
insert into #Mediciones (idSensor , idToma , inicioToma , duracionIntervalo , Maximo , Minimo , Promedio , cantidad, x, y, EsFijo )
select ssr.[Sensor-id], id Toma, MIN(f.fechaDesde),@segunos, MAX(cast(ssr.Value as float)) Maximo,  MIN(cast(ssr.value as float)) Minimo, AVG(cast(ssr.Value as float)) Promedio, COUNT(*) Mediciones, max(ssl.Long), max(ssl.Lat), 1
 from StaticSensorReadings ssr inner join StaticSensorLocations ssl on ssl.[Sensor-id]= ssr.[Sensor-id] inner join #Fechas f on cast(ssr.Timestamp  as datetime) between f.fechaDesde  and f.fechaHasta group by id, ssr.[Sensor-id] 
 union
	select tomas.*, long.value, lat.value, 0 from (select ssr.[Sensor-id] , id Toma, MIN(f.fechaDesde) incioToma,@segunos duracion, MAX(cast(ssr.Value as float)) Maximo,  MIN(cast(ssr.value as float)) Minimo, AVG(cast(ssr.Value as float)) Promedio, COUNT(*) Mediciones
 from MobileSensorReadings ssr  inner join #Fechas f on cast(ssr.Timestamp  as datetime) between f.fechaDesde  and f.fechaHasta group by id, ssr.[Sensor-id] ) Tomas
 inner join (select ssr.[Sensor-id] , id Toma, ssr.Value value, MAX(ssr.lat) lat  from MobileSensorReadings ssr  inner join #Fechas f on cast(ssr.Timestamp  as datetime) between f.fechaDesde  and f.fechaHasta group by id, ssr.[Sensor-id], ssr.Value  ) 
 lat on lat.[Sensor-id] = Tomas.[Sensor-id] and lat.Toma= Tomas.Toma and lat.value = Tomas.Maximo
 inner join (select ssr.[Sensor-id] , id Toma, ssr.Value value, ssr.Lat, MAX(ssr.Long) long from MobileSensorReadings ssr  inner join #Fechas f on cast(ssr.Timestamp  as datetime) between f.fechaDesde  and f.fechaHasta group by id, ssr.[Sensor-id], ssr.Value , ssr.Lat ) 
 long on long.[Sensor-id] = Tomas.[Sensor-id] and long.Toma= Tomas.Toma and lat.lat = long.Lat and long.value = Tomas.Maximo
 
 select * from #Mediciones order by idToma, EsFijo , idSensor