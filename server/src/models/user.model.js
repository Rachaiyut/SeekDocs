module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        user_id: {
            // ด้านล่างเป็นการตั้งค่า attribute ของ table นะครับ
            // ชื่อตัวแปรที่เราใช้เรียกแทน: { type: Sequelize.STRING(50), allowNull: false, field: 'ชื่อของ attribute' } 
            // สามารถใส่ option เพิ่มเติมได้นะครับเช่น primaryKey: true อะไรแบบนี้ 
            // แล้วก็อันนี้สำคัญ ** ไม่จำเป็นต้องสร้าง attribute ที่เป็น FK จาก table อื่นนะครับ เพราะเราจะไปกำหนด relation กันใน file index
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        role: {
            type: Sequelize.STRING(6),
            defaultValue: 'member'
        },
        name_title: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        firstname: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        lastname: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(50),
            allowNull: false, 
            unique: true
        },
        password: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        gender: {
            type: Sequelize.STRING(1),
            allowNull: false
        },
        avatar: {
            type: Sequelize.STRING(255)
        },
        user_status: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        }
    },{
        tableName: "users",
        timestamps: false
    });
    return User;
};
