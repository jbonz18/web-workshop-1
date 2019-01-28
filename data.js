var students = [
    {id: "1122222", name: "John", score: 90 }, // 0 {Object} => students[0] => students[0].score => total  
    {id: "2223333", name: "Larry", score: 60 }, // 1
    {id: "4455555", name: "Joseph", score: 50 }, // 2
    {id: "5526666", name: "Karla", score: 80}
];

document.write("<h3>JSON</h3>");
document.write("<pre class='alert alert-secondary'>"); // 1) Bootstrap class
document.write(JSON.stringify(students, undefined, 2));
document.write("</pre>");
document.write("<br/>");
var names = [];

students.forEach(student => {
    names.push(student.name);
});

document.writeln("Students are:" + names);
//
document.write("<pre>");
document.writeln(`Average: ${calculateAverage()}`);
document.write("</pre>");

function calculateAverage(){

    var average = 0;
    students.forEach(student => {
        average = average + student.score;
    });
    average = average / students.length;

    return average;
}

function loadDataGrid() {

    var i = 0;
    let dataList = document.getElementById("dataList");
    

    while (i < students.length)
    {
        var listItem = document.createElement("section");
        listItem.classList.add("row");
        
        var id = document.createElement("div");
        id.classList.add("col-sm");
        id.innerText =  students[i].id;

        var name = document.createElement("div");
        name.classList.add("col-sm");
        name.innerText =  students[i].name;

        var score = document.createElement("div");
        score.classList.add("col-sm");
        score.innerText =  students[i].score;

        //console.log(students[i]);

        dataList.appendChild(listItem);

        listItem.appendChild(id);
        listItem.appendChild(name);
        listItem.appendChild(score);

        //Paint numbers on red when under the minimun score
       
        if (students[i].score < 60){
            score.style.color = "red";
        }

        i = i + 1; // Alternatively, use i++;

        
        // Other ways:
        // i += 2;
        // i += 3;
    }
}

function displayAverage()
{
    //var resultSection = document.getElementById("resultSection");
    //var paragraph = document.createElement("p");
    var paragraph = document.getElementById("paragraphAverage")
    paragraph.classList.add("badge"); // 2) Bootstrap classes
    paragraph.classList.add("badge-info");

    paragraph.innerText = "Average: " + calculateAverage();

    resultSection.appendChild(paragraph);
}

function myReplacer(name, val) {
    if (typeof val === 'string') {
        return val.toString().toUpperCase();  
     } else {
        return val; // return as is
    }
};

// Old-way of loading data (ol). No longer used
function loadData(){

    var i = 0;
    let dataList = document.getElementById("dataList");
    
    while (i < students.length)
    {
        var listItem = document.createElement("li");
        
        console.log(students[i]);
        listItem.innerText = students[i].name;

        dataList.appendChild(listItem);
        i = i + 1; // Alternatively, use i++;

        // Other ways:
        // i += 2;
        // i += 3;
    }
}

//Refresh cu
function refresh(){
    //Get minimum score from the user input, on input id "minScore"
    var minScore = document.getElementById("minScore").value;
    var i = 0;
    //console.log(minScore);
    console.log(students.length);
    var textTable = document.getElementById("dataList").getElementsByTagName("section");
    while (i < students.length){
        
        var cellScore = textTable[i].childNodes[2];
        //console.log(cellScore);
        
        if (students[i].score < minScore ){
            cellScore.style.color = "red";
            }
            else{
                cellScore.style.color = "black";
            }
        
        i+=1;
    }
}

function addStudent() {

    var i = 0;
    let dataList = document.getElementById("dataList");
    
    var studentID = document.getElementById("studentID").value;
    var studentName = document.getElementById("studentName").value;
    var studentScore = parseInt(document.getElementById("studentScore").value);

    students.push({id: studentID, name: studentName, score: studentScore});
    
    //refresh()

    //loadDataGrid()

    

        var listItem = document.createElement("section");
        listItem.classList.add("row");
        
        var id = document.createElement("div");
        id.classList.add("col-sm");
        id.innerHTML =  studentID;

        var name = document.createElement("div");
        name.classList.add("col-sm");
        name.innerHTML =  studentName;

        var score = document.createElement("div");
        score.classList.add("col-sm");
        score.innerHTML =  studentScore;

        //console.log(students[i]);

        dataList.appendChild(listItem);

        listItem.appendChild(id);
        listItem.appendChild(name);
        listItem.appendChild(score);


        
        //students.push({id: id, name: name, score: score});
        


        //Paint numbers on red when under the minimun score
       
        // if (score < 60){
        //     score.style.color = "red";
        // }

        // i = i + 1; // Alternatively, use i++;

        
        // Other ways:
        // i += 2;
        // i += 3;
    }
