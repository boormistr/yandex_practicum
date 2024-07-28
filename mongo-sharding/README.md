Порядок инициализации шардирования:
1. Указание в compose-файле четырех инстансов mongo с разными настройками:
    Конфигуратор
    Роутер
    Шард1
    Шард2
2. Инициализация сервера конфигурации
rs.initiate(
  {
    _id : "config_server",
       configsvr: true,
    members: [
      { _id : 0, host : "configSrv:27017" }
    ]
  }
);
3. Инициализация шардов
rs.initiate(
    {
      _id : "shard1",
      members: [
        { _id : 0, host : "shard1:27018" },
       // { _id : 1, host : "shard2:27019" }
      ]
    }
);
4. Инициализация роутера 
   sh.addShard( "shard1/shard1:27018");
   sh.addShard( "shard2/shard2:27019");
   sh.enableSharding("somedb");
   sh.shardCollection("somedb.helloDoc", { "name" : "hashed" } )