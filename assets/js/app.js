// assets/js/app.js
let data;
fetch('data/patterns.json')
 .then(r=>r.json())
 .then(d=>{data=d; buildSidebar();})
 .catch(console.error);

function buildSidebar(){
  const sb = document.getElementById('sidebar');
  sb.innerHTML='';
  recurse(data, sb);
}

function recurse(nodes, parent){
  nodes.forEach(n=>{
    if(n.children){
      const d=document.createElement('details');
      const s=document.createElement('summary');
      s.textContent=n.name;
      d.append(s);
      recurse(n.children,d);
      parent.append(d);
    } else {
      const a=document.createElement('a');
      a.textContent=n.name; a.href='#';
      a.className='leaf';
      a.onclick=e=>{e.preventDefault(); showCard(n);};
      parent.append(a);
    }
  });
}

function showCard(n){
  const ct=document.getElementById('content');
  const c=document.createElement('div'); c.className='card';
  c.innerHTML=`
    <div class="card-body">
      <div class="card-title">${n.name}</div><br>
      <a class="card-link" href="${n.link}" target="_blank">View Question</a>
    </div>`;
  ct.prepend(c);
}

const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');

menuBtn.onclick = () => {
  sidebar.classList.toggle('open');
  menuBtn.classList.toggle('open');
};
// click anywhere in the content to close
content.onclick = () => {
  if (sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
    menuBtn.classList.remove('open');
  }
};