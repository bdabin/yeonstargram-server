module.exports = function (Sequelize, DataTypes) {
  var BoardMemo = Sequelize.define('BoardMemo',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      content: { type: DataTypes.TEXT }
    }, {
    // 테이블명을 설정안할시 BoardMemos로 자동생성
    tableName: 'BoardMemo'
  }
  );
  return BoardMemo
}