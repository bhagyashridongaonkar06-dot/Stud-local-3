const cl = console.log;

const empForm = document.getElementById('empForm')
const empList = document.getElementById('empList')
const name1 = document.getElementById('name')
const age = document.getElementById('age')
const role = document.getElementById('role')
const experience = document.getElementById('experience')
const addBtn = document.getElementById('addBtn')
const updateBtn = document.getElementById('updateBtn')

let employeeList = [
    { id: '1', name: "Raj", age: 25, role: "Developer", experience: 2 },
    { id: '2', name: "Neha", age: 28, role: "Designer", experience: 4 },
    { id: '3', name: "Karan", age: 26, role: "Tester", experience: 3 },
    { id: '4', name: "Pooja", age: 30, role: "Manager", experience: 6 },
    { id: '5', name: "Vikas", age: 24, role: "Developer", experience: 1 }
]; 
 

// localStorage.setItem("empArr", JSON.stringify(employeeList));

let getData = localStorage.getItem('empArr')
let empArr
if(getData){
    empArr = JSON.parse(getData)
}else{
     empArr = employeeList
    localStorage.setItem('empArr', JSON.stringify(empArr))
}

function onCreate(arr){
    let res = '';

    arr.forEach((ele, i) => {
        res += `<tr id="${ele.id}">
                                    <td>${i + 1}</td>
                                    <td>${ele.name}</td>
                                    <td>${ele.age}</td>
                                    <td>${ele.role}</td>
                                    <td>${ele.experience}</td>
                                    <td><i onclick="onEdit(this)" data-edit-id="${ele.id}" class="fa-solid fa-pen-to-square fa-2x text-success"></i></td>
                                    <td><i onclick="onDelete(this)" data-delete-id="${ele.id}" class="fa-solid fa-trash fa-2x text-danger"></i></td>
                                </tr>`
    });
    empList.innerHTML = res;
}

onCreate(empArr)

function onSubmit(eve){
    eve.preventDefault();

    let newEmp = {
        id : Date.now().toString(),
        name : name1.value,
        age : age.value,
        role : role.value,
        experience : experience.value
    }
    empArr.push(newEmp)
    empForm.reset();

    let tr = document.createElement('tr')
    tr.id = newEmp.id
    tr.innerHTML = `<td>${empArr.length}</td>
                                    <td>${newEmp.name}</td>
                                    <td>${newEmp.age}</td>
                                    <td>${newEmp.role}</td>
                                    <td>${newEmp.experience}</td>
                                    <td><i onclick="onEdit(this)"  data-edit-id="${newEmp.id}" class="fa-solid fa-pen-to-square fa-2x text-success"></i></td>
                                    <td><i onclick="onDelete(this)" data-detete-id="${newEmp.id}"  class="fa-solid fa-trash fa-2x text-danger"></i></td>`
    empList.append(tr)
}

function onEdit(ele){
    let edit_Id = ele.dataset.editId;
    // cl(edit_Id)

    localStorage.setItem('editId', edit_Id)

    let editObj = empArr.find(e => e.id === edit_Id)
    // cl(editObj)

    name1.value = editObj.name
    age.value = editObj.age
    role.value = editObj.role
    experience.value = editObj.experience


    addBtn.classList.add('d-none')
    updateBtn.classList.remove('d-none')
}

function onUpdate(){
    let updateId = localStorage.getItem('editId')
    localStorage.removeItem('editId')
    // cl(updateId)

    let updateObj = {
        id : updateId,
        name : name1.value,
        age : age.value,
        role : role.value,
        experience : experience.value
    }
    empForm.reset()

    let getIndex = empArr.findIndex(e => e.id === updateId)
    empArr[getIndex] = updateObj

    localStorage.setItem('empArr', JSON.stringify(empArr))

    let tr = document.getElementById(updateId).children;
    // cl(tr)
    tr[1].innerText = updateObj.name
    tr[2].innerText = updateObj.age
    tr[3].innerText = updateObj.role
    tr[4].innerText = updateObj.experience

    addBtn.classList.remove('d-none')
    updateBtn.classList.add('d-none')
}

function onDelete(ele){
    let deleteId = ele.dataset.deleteId;
    // cl(deleteId)

    let getConfirm = confirm(`you really want to delete the employee with id ${deleteId}`)

    if(getConfirm){
        let getIndex = empArr.findIndex(e => e.id === deleteId)

        empArr.splice(getIndex, 1)
        localStorage.setItem('empArr', JSON.stringify(empArr))

        document.getElementById(deleteId).remove()

        let tds = document.querySelectorAll('#empList tr td:first-child')
        tds.forEach((e, i) => i + 1)
    }
}



empForm.addEventListener('submit', onSubmit)
updateBtn.addEventListener('click', onUpdate)
