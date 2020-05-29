const types = {
  a: undefined,
  b: null,
  c: true,
  d: false,
  e: 11,
  f: 9007199254740991n,
  g: 1n,
  h: 'hello',
  // i: Symbol("id"),
  j: {},
  k: NaN,
  l: '',
  m: -78 % 33
};

let table = document.createElement('table');
document.body.appendChild(table);

let tableInnerHtml = `
  <thead>
    <tr>
    <th>Variable</th>
    <th>Value</th>
    <th>typeof</th>
    <th>Boolean</th>
    <th>Number</th>
    </tr>
  </thead>
  <tbody>
  `;

for (let property in types) {
  tableInnerHtml += `
    <tr>
      <td>${property}</td>
      <td>${types[property]}</td>
      <td>${typeof types[property]}</td>
      <td>${Boolean(types[property])}</td>
      <td>${Number(types[property])}</td>
    </tr>
    `;
}

tableInnerHtml += `
  </tbody>
  </table>
`;
table.innerHTML = tableInnerHtml;

let style = document.createElement('style');
document.head.appendChild(style);

style.innerHTML = `
  table {
    margin: 0 auto;
    margin-top: 30px;
  }
  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
  }
  td, th {
    padding: 10px;
  }

  th {
    background-color: #bddcfc;
  }
`;


console.log('**************');

var person = {
  age: 0
}

console.log(person);

for (i = 1000000000000; i > 0; i--) {
  person.age = person.age + 1
}

console.log(person);