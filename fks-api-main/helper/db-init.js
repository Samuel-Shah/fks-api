const connection = require('./db-connection')

checkConnection();
function checkConnection() {
    connection.connect(function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log("CONNECTION ESTABLISHED");
            checkDatabase();
        }
    });
}
function checkDatabase(params) {
    connection.connect(function (error) {
        //'role' TABLE CREATION IF NOT EXISTS
        connection.query("CREATE TABLE IF NOT EXISTS role "
        + "(role_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,"
        + " role_name VARCHAR(100) NOT NULL,"
        + " status TINYINT DEFAULT 1 NOT NULL)",
        function (error, result, fields) {
            if (error) {
                console.log(error);
            }
        });
        //'user' TABLE CREATION IF NOT EXISTS
        connection.query("CREATE TABLE IF NOT EXISTS user "
        + "(user_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,"
        + " first_name VARCHAR(100) NOT NULL," 
        + " last_name VARCHAR(100) NOT NULL,"
        + " mobile VARCHAR(10) NOT NULL," 
        + " email VARCHAR(200) NOT NULL," 
        + " password VARCHAR(100) NOT NULL," //VERIFY AND UPDATE LATER
        + " created_by VARCHAR(20) NOT NULL," 
        + " updated_by TEXT NOT NULL," 
        + " deleted_by TEXT NOT NULL,"
        + " created_date DATETIME NOT NULL DEFAULT '1000-01-01 00:00:00',"
        + " updated_date DATETIME NOT NULL DEFAULT '1000-01-01 00:00:00',"
        + " deleted_date DATETIME NOT NULL DEFAULT '1000-01-01 00:00:00',"
        + " role_id INTEGER NOT NULL,"
        + " FOREIGN KEY (role_id) REFERENCES role(role_id),"
        + " status TINYINT DEFAULT 1 NOT NULL)",
        function (error, result, fields) {
            if (error) {
                console.log(error);
            }
        });
        //'priviledge' TABLE CREATION IF NOT EXISTS
        connection.query("CREATE TABLE IF NOT EXISTS priviledge "
        + "(priviledge_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,"
        + " priviledge_level VARCHAR(2) NOT NULL,"
        + " priviledge_name VARCHAR(100) NOT NULL,"
        + " status TINYINT DEFAULT 1 NOT NULL)",
        function (error, result, fields) {
            if (error) {
                console.log(error);
            }
        });
        //'class' TABLE CREATION IF NOT EXISTS
        connection.query("CREATE TABLE IF NOT EXISTS class "
        + "(class_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,"
        + " class_name VARCHAR(100) NOT NULL,"
        + " class_teacher_id INTEGER,"
        + " FOREIGN KEY (class_teacher_id) REFERENCES user(user_id),"
        + " status TINYINT DEFAULT 1 NOT NULL)",
        function (error, result, fields) {
            if (error) {
                console.log(error);
            }
        });
        //teacher_details TABLE CREATION IF NOT EXISTS
        connection.query("CREATE TABLE IF NOT EXISTS teacher_details "
        + "(teacher_details_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,"
        + " profile_picture_url TEXT NOT NULL,"
        + " short_desc TEXT NOT NULL,"
        + " user_id INTEGER NOT NULL,"
        + " FOREIGN KEY (user_id) REFERENCES user(user_id),"
        + " status TINYINT DEFAULT 1 NOT NULL)",
        function (error, result, fields) {
            if (error) {
                console.log(error);
            }
        });
        //student_details TABLE CREATION IF NOT EXISTS
        connection.query("CREATE TABLE IF NOT EXISTS student_details "
        + "(student_details_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,"
        + " admission_number INTEGER NOT NULL,"
        + " blood_group VARCHAR(3) NOT NULL,"
        + " user_id INTEGER NOT NULL,"
        + " class_id INTEGER,"
        + " FOREIGN KEY (user_id) REFERENCES user(user_id),"
        + " FOREIGN KEY (class_id) REFERENCES class(class_id),"
        + " status TINYINT DEFAULT 1 NOT NULL)",
        function (error, result, fields) {
            if (error) {
                console.log(error);
            }
        });
        //'parent_has_student ' TABLE CREATION IF NOT EXISTS
        connection.query("CREATE TABLE IF NOT EXISTS parent_has_student "
        + "(parent_has_student_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,"
        + " student_id INTEGER,"
        + " parent_id INTEGER,"
        + " FOREIGN KEY (student_id) REFERENCES user(user_id),"
        + " FOREIGN KEY (parent_id) REFERENCES user(user_id),"
        + " occupation TEXT NOT NULL,"
        + " status TINYINT DEFAULT 1 NOT NULL)",
        function (error, result, fields) {
            if (error) {
                console.log(error);
            }
        });
        //'subject_type' TABLE CREATION IF NOT EXISTS
        connection.query("CREATE TABLE IF NOT EXISTS subject_type "
        + "(subject_type_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,"
        + " subject_type_name VARCHAR(100) NOT NULL,"
        + " status TINYINT DEFAULT 1 NOT NULL)",
        function (error, result, fields) {
            if (error) {
                console.log(error);
            }
        });
        //'subject' TABLE CREATION IF NOT EXISTS
        connection.query("CREATE TABLE IF NOT EXISTS subject "
        + "(subject_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,"
        + " subject_name VARCHAR(100) NOT NULL,"
        + " subject_type_id INTEGER,"//MANDATORY OR NOT
        + " class_id INTEGER,"
        + " subject_teacher_id INTEGER,"
        + " FOREIGN KEY (subject_type_id) REFERENCES subject_type(subject_type_id),"
        + " FOREIGN KEY (class_id) REFERENCES class(class_id),"
        + " FOREIGN KEY (subject_teacher_id) REFERENCES user(user_id),"
        + " status TINYINT DEFAULT 1 NOT NULL)",
        function (error, result, fields) {
            if (error) {
                console.log(error);
            }
        });
        //'student_has_subject' TABLE CREATION IF NOT EXISTS
        connection.query("CREATE TABLE IF NOT EXISTS student_has_subject "
        + "(student_has_subject_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,"
        + " student_id INTEGER NOT NULL,"
        + " subject_id INTEGER NOT NULL,"
        + " FOREIGN KEY (student_id) REFERENCES user(user_id),"
        + " FOREIGN KEY (subject_id) REFERENCES subject(subject_id),"
        + " status TINYINT DEFAULT 1 NOT NULL)",
        function (error, result, fields) {
            if (error) {
                console.log(error);
            }
        });
        //'assignment_type' TABLE CREATION IF NOT EXISTS
        connection.query("CREATE TABLE IF NOT EXISTS assignment_type "
        + "(assignment_type_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,"
        + " assignment_type_name VARCHAR(100) NOT NULL,"
        + " status TINYINT DEFAULT 1 NOT NULL)",
        function (error, result, fields) {
            if (error) {
                console.log(error);
            }
        });
        //'assignment_question_type' TABLE CREATION IF NOT EXISTS
        connection.query("CREATE TABLE IF NOT EXISTS assignment_question_type "
        + "(assignment_question_type_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,"
        + " assignment_question_type_name VARCHAR(100) NOT NULL,"
        + " status TINYINT DEFAULT 1 NOT NULL)",
        function (error, result, fields) {
            if (error) {
                console.log(error);
            }
        });
        //'assignment' TABLE CREATION IF NOT EXISTS
        connection.query("CREATE TABLE IF NOT EXISTS assignment "
        + "(assignment_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,"
        + " assignment_name VARCHAR(100) NOT NULL,"
        + " subject_id INTEGER,"
        // + " graded TINYINT DEFAULT 1 NOT NULL," //assignment/ASSESSMENTS/ETC
        + " assignment_type_id INTEGER,"// MCQs/ONE_LINERS/ESSAY//MIXED/ETC
        + " assignment_question_type_id INTEGER,"// MCQs/ONE_LINERS/ESSAY//MIXED/ETC
        + " total_marks FLOAT,"
        + " assignment_value JSON,"
        + " created_by VARCHAR(20) NOT NULL," 
        + " updated_by TEXT NOT NULL," 
        + " deleted_by TEXT NOT NULL,"
        + " created_date DATETIME NOT NULL DEFAULT '1000-01-01 00:00:00',"
        + " updated_date DATETIME NOT NULL DEFAULT '1000-01-01 00:00:00',"
        + " deleted_date DATETIME NOT NULL DEFAULT '1000-01-01 00:00:00',"
        + " FOREIGN KEY (subject_id) REFERENCES subject(subject_id),"
        + " FOREIGN KEY (assignment_type_id) REFERENCES assignment_type(assignment_type_id),"
        + " FOREIGN KEY (assignment_question_type_id) REFERENCES assignment_question_type(assignment_question_type_id),"
        + " status TINYINT DEFAULT 1 NOT NULL)",
        function (error, result, fields) {
            if (error) {
                console.log(error);
            }
        });
        /**
         * FOLLOWING TABLES ARE FOR MCQ TYPE QUESTIONS, WE CAN ADD DIFFERENT TYPE OF 
         * QUESTIONS IN THE SIMILAR WAY
         */
        //'mcq_questions' TABLE CREATION IF NOT EXISTS
        connection.query("CREATE TABLE IF NOT EXISTS mcq_questions "
        + "(mcq_questions_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,"
        + " mcq_questions_title VARCHAR(100) NOT NULL,"
        + " assignment_id INTEGER,"
        + " FOREIGN KEY (assignment_id) REFERENCES assignment(assignment_id),"
        + " status TINYINT DEFAULT 1 NOT NULL)",
        function (error, result, fields) {
            if (error) {
                console.log(error);
            }
        });
        //'mcq_options' TABLE CREATION IF NOT EXISTS
        connection.query("CREATE TABLE IF NOT EXISTS mcq_options "
        + "(mcq_options_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,"
        + " mcq_options_title VARCHAR(100) NOT NULL,"
        + " mcq_questions_id INTEGER,"
        + " value TINYINT DEFAULT 1 NOT NULL,"
        + " FOREIGN KEY (mcq_questions_id) REFERENCES mcq_questions(mcq_questions_id),"
        + " status TINYINT DEFAULT 1 NOT NULL)",
        function (error, result, fields) {
            if (error) {
                console.log(error);
            }
        });
        //'student_mcq_options' TABLE CREATION IF NOT EXISTS
        connection.query("CREATE TABLE IF NOT EXISTS student_mcq_options "
        + "(student_mcq_options_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,"
        + " student_id INTEGER NOT NULL,"
        + " mcq_options_id INTEGER,"
        + " FOREIGN KEY (student_id) REFERENCES user(user_id),"
        + " FOREIGN KEY (mcq_options_id) REFERENCES mcq_options(mcq_options_id),"
        + " status TINYINT DEFAULT 1 NOT NULL)",
        function (error, result, fields) {
            if (error) {
                console.log(error);
            }
        });
        //'class_has_assignment' TABLE CREATION IF NOT EXISTS
        connection.query("CREATE TABLE IF NOT EXISTS class_has_assignment "
        + "(class_has_assignment_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,"
        + " class_id INTEGER NOT NULL,"
        + " assignment_id INTEGER,"
        + " FOREIGN KEY (class_id) REFERENCES class(class_id),"
        + " FOREIGN KEY (assignment_id) REFERENCES assignment(assignment_id),"
        + " status TINYINT DEFAULT 1 NOT NULL)",
        function (error, result, fields) {
            if (error) {
                console.log(error);
            }
        });
        //'student_completed_assignment' TABLE CREATION IF NOT EXISTS
        connection.query("CREATE TABLE IF NOT EXISTS student_completed_assignment "
        + "(student_completed_assignment_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,"
        + " attachment_url TEXT NOT NULL," 
        + " percentage_completed FLOAT NOT NULL,"
        + " student_id INTEGER NOT NULL,"
        + " assignment_id INTEGER,"
        + " assignment_answer_value JSON,"
        + " attained_marks FLOAT NOT NULL DEFAULT 0.0,"
        + " comments VARCHAR(200),"
        + " FOREIGN KEY (student_id) REFERENCES user(user_id),"
        + " FOREIGN KEY (assignment_id) REFERENCES assignment(assignment_id),"
        + " status TINYINT DEFAULT 1 NOT NULL)",
        function (error, result, fields) {
            if (error) {
                console.log(error);
            }
        });
    });
}

module.exports = checkConnection;