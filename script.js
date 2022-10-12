let already_op = false;
let o = null;
let x = null;
let y = null;
let after_result = false;
operators = {
    "+": "add",
    "-": "sub",
    "×": "mul",
    "÷": "div"
}

function read_input(element){

    let input_field = document.getElementById("input_field").value;
    let operator = ["+", "-", "×", "÷", "="].includes(element.value);
    let empty = input_field.length==0;
    if(after_result){
        document.getElementById("input_field").value = "";
        input_field = "";
        empty = true;
        x = null;
        y = null;
        o = null;
        already_op = false;
        after_result = false;
    }
    if(element.value === "←"){
        if(["+", "-", "×", "÷", "="].includes(""+input_field.charAt(input_field.length-1))){
            already_op = false;
        }
        document.getElementById("input_field").value = document.getElementById("input_field").value.slice(0,-1);
    }
    else if(element.value == "C"){
        document.getElementById("input_field").value = "";
        already_op = false;
    }
    else if(empty && element.value == "-"){
        document.getElementById("input_field").value += element.value;
    }
    else if(empty && (operator || element.value === "0") || operator && already_op || input_field==="-" && operator || input_field[input_field.length-1] === o && element.value === "0"){

    }
    else{
        if(operator){
            already_op = true;
            x = input_field;
            o = element.value;
        }
        document.getElementById("input_field").value += element.value;
    }
}

function submit(){
    if(!after_result){
        input_field = document.getElementById("input_field").value;
        y = input_field.substring(input_field.lastIndexOf(o)+1)
        onGet();
        
        
        after_result = true;
    }
}

function onGet() {
    const url = 'https://0p5wanp0ob.execute-api.eu-west-1.amazonaws.com/calculate?x='+x+'&y='+y+'&o='+operators[o];
    fetch(url)
        .then((response) => response.json())
        .then((data) => document.getElementById("input_field").value = data['r']);
}