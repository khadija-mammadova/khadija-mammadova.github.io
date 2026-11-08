// Shared navigation and Multiverse interactions
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.textContent = open ? "✕" : "☰";
    });
  }

  const matchButton = document.querySelector("#generate-match");
  if (matchButton) {
    const matches = [
      {quote:"“The universe is under no obligation to make sense to you.”",fact:"The Fibonacci sequence is formed by adding the two previous numbers to get the next.",note:"Like a complex story, a simple rule can create patterns that unfold in surprising ways."},
      {quote:"“Do not go gentle into that good night.”",fact:"The Golden Ratio is approximately 1.618 and is often studied in geometry and design.",note:"Both invite us to look for structure, rhythm, and meaning in the world around us."},
      {quote:"“It's not who I am underneath, but what I do that defines me.”",fact:"A truth table lists every possible input combination for a logic operation.",note:"In stories and circuits alike, what matters is how a system responds to its choices or inputs."},
      {quote:"“Even the smallest person can change the course of the future.”",fact:"A fractal is a pattern that can show similar structure at different scales.",note:"Small pieces can contribute to something much larger — in mathematics and in life."},
      {quote:"“All we have to decide is what to do with the time that is given us.”",fact:"A prime number has exactly two positive divisors: 1 and itself.",note:"A simple definition can open the door to a huge world of mathematical questions."}
    ];
    matchButton.addEventListener("click", () => {
      const item = matches[Math.floor(Math.random() * matches.length)];
      document.querySelector("#match-quote").textContent = item.quote;
      document.querySelector("#match-fact").textContent = item.fact;
      document.querySelector("#match-connection").textContent = item.note;
      const card = document.querySelector("#match-card");
      card.animate([{transform:"perspective(900px) rotateY(-5deg) scale(.97)",opacity:.65},{transform:"perspective(900px) rotateY(0) scale(1)",opacity:1}],{duration:420,easing:"ease-out"});
      addPoints(1);
    });
  }

  const questionSets = {
    cinema:{label:"CINEMA TRIVIA",items:[
      {q:"Which film features the fictional planet Miller's Planet?",a:["The Dark Knight","Interstellar","The Lord of the Rings"],correct:1,why:"Miller's Planet appears in Christopher Nolan's Interstellar."},
      {q:"Which series follows Walter White?",a:["Breaking Bad","Sherlock","The Crown"],correct:0,why:"Breaking Bad follows chemistry teacher Walter White."},
      {q:"Who is the author of The Lord of the Rings?",a:["Frank Herbert","J. R. R. Tolkien","George Orwell"],correct:1,why:"J. R. R. Tolkien wrote The Lord of the Rings."}
    ]},
    science:{label:"MATH & SCIENCE",items:[
      {q:"What is the next number in the Fibonacci sequence: 1, 1, 2, 3, 5, ...?",a:["6","8","10"],correct:1,why:"Add the previous two terms: 3 + 5 = 8."},
      {q:"What is the approximate value of the Golden Ratio?",a:["1.618","2.718","3.142"],correct:0,why:"The Golden Ratio is approximately 1.618."},
      {q:"Which logic gate outputs 1 only when both inputs are 1?",a:["OR","NOT","AND"],correct:2,why:"An AND gate is true only when both inputs are true."}
    ]},
    skills:{label:"SKILL UNLOCKER",items:[
      {q:"Which project explores AND, OR, and NOT operations?",a:["Logic Gates Project","Math Foundations","Web Coding with AI"],correct:0,why:"Logic gates are the focus of the first project."},
      {q:"Which skill helps organize the steps needed to solve a problem?",a:["Guessing","Mathematical reasoning","Ignoring patterns"],correct:1,why:"Mathematical reasoning helps explain and justify a solution."},
      {q:"Which trio is used to build this portfolio?",a:["HTML, CSS, JavaScript","Python, Excel, SQL","C, Rust, Swift"],correct:0,why:"HTML structures content, CSS styles it, and JavaScript adds interaction."}
    ]}
  };
  let category="cinema", index=0, answered=false;
  const tabs=[...document.querySelectorAll(".tab")];
  const question=document.querySelector("#question");
  if(question){
    const answers=document.querySelector("#answers"), feedback=document.querySelector("#feedback"), next=document.querySelector("#next-question");
    function render(){
      answered=false; const item=questionSets[category].items[index];
      document.querySelector("#quiz-category").textContent=questionSets[category].label;
      question.textContent=item.q; feedback.textContent="Choose an answer to earn points."; next.disabled=true;
      answers.innerHTML="";
      item.a.forEach((choice,i)=>{const b=document.createElement("button");b.className="answer";b.textContent=choice;b.addEventListener("click",()=>choose(i));answers.appendChild(b);});
    }
    function choose(choice){
      if(answered)return; answered=true; const item=questionSets[category].items[index]; const buttons=[...answers.children];
      buttons.forEach((b,i)=>{b.disabled=true;if(i===item.correct)b.classList.add("correct");else if(i===choice)b.classList.add("wrong");});
      if(choice===item.correct){feedback.textContent="Correct! "+item.why;addPoints(10);}else{feedback.textContent="Not quite. "+item.why;}
      next.disabled=false;
    }
    tabs.forEach(tab=>tab.addEventListener("click",()=>{tabs.forEach(t=>t.classList.toggle("active",t===tab));category=tab.dataset.tab;index=0;render();}));
    next.addEventListener("click",()=>{index=(index+1)%questionSets[category].items.length;render();});
    render();
  }

  let score=0, missions=0;
  function addPoints(points){score+=points;missions++;const scoreEl=document.querySelector("#score");if(!scoreEl)return;scoreEl.textContent=score;document.querySelector("#missions").textContent=missions;document.querySelector("#badge").textContent=score>=50?"Multiverse Master":score>=20?"Pattern Seeker":score>=10?"Curious Explorer":"Rookie Explorer";}
});
