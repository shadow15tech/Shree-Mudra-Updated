// ---- Drawer nav ----
  const drawer = document.getElementById('drawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  function openDrawer(){ drawer.classList.add('show'); drawerOverlay.classList.add('show'); }
  function closeDrawer(){ drawer.classList.remove('show'); drawerOverlay.classList.remove('show'); }
  document.getElementById('menuBtn').addEventListener('click', openDrawer);
  document.getElementById('drawerClose').addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);
  document.querySelectorAll('.drawer-link').forEach(a=>a.addEventListener('click', closeDrawer));

  // ---- Search icon -> jump to product ----
  document.getElementById('searchBtn').addEventListener('click', ()=>{
    document.getElementById('gallery').scrollIntoView({behavior:'smooth'});
  });

  // ---- Shared random Hindu name + India city pool (huge combinatorial variety, 300+) ----
  const FIRST_NAMES = [
    'Aarav','Vivaan','Aditya','Vihaan','Arjun','Sai','Reyansh','Ayaan','Krishna','Ishaan',
    'Rohan','Kabir','Aryan','Dev','Yash','Om','Rudra','Shaurya','Advait','Pranav',
    'Rakesh','Suresh','Ramesh','Mahesh','Naresh','Dinesh','Manoj','Sanjay','Ajay','Vijay',
    'Amit','Sumit','Rohit','Mohit','Rahul','Raj','Vikas','Vikram','Deepak','Anil',
    'Sunil','Ravi','Ashok','Prakash','Arun','Vinod','Yogesh','Satish','Harish','Girish',
    'Priya','Ananya','Diya','Aadhya','Ishita','Saanvi','Myra','Anika','Riya','Kavya',
    'Sneha','Pooja','Neha','Kritika','Simran','Meera','Radha','Gauri','Kiran','Nikita',
    'Swati','Sunita','Rekha','Manisha','Vandana','Preeti','Aarti','Divya','Shreya','Komal'
  ];
  const LAST_NAMES = [
    'Sharma','Verma','Gupta','Agarwal','Singh','Yadav','Kumar','Mishra','Tiwari','Pandey',
    'Joshi','Chauhan','Rathore','Rajput','Thakur','Shukla','Dubey','Trivedi','Pathak','Saxena',
    'Bhatt','Chaturvedi','Dwivedi','Nair','Menon','Pillai','Iyer','Reddy','Naidu','Rao',
    'Patel','Mehta','Shah','Desai','Bose','Banerjee','Chatterjee','Mukherjee','Das','Ghosh'
  ];
  const CITIES = [
    'Delhi','Mumbai','Jaipur','Lucknow','Indore','Bhopal','Pune','Ahmedabad','Surat','Kanpur',
    'Patna','Bhubaneswar','Chandigarh','Nagpur','Varanasi','Agra','Amritsar','Ludhiana','Ranchi','Raipur',
    'Guwahati','Kochi','Coimbatore','Chennai','Bengaluru','Hyderabad','Vadodara','Jodhpur','Udaipur','Meerut',
    'Nashik','Rajkot','Gwalior','Vijayawada','Madurai','Mysuru','Noida','Gurugram','Faridabad','Dehradun'
  ];
  function randomPerson(){
    const first = FIRST_NAMES[Math.floor(Math.random()*FIRST_NAMES.length)];
    const last = LAST_NAMES[Math.floor(Math.random()*LAST_NAMES.length)];
    const city = CITIES[Math.floor(Math.random()*CITIES.length)];
    const style = Math.random();
    // vary the display format so it doesn't look like a fixed template
    const name = style < 0.45 ? first : style < 0.85 ? `${first} ${last}` : `${first} ${last.charAt(0)}.`;
    return { name, city };
  }

  // ---- Live sale ticker: random names, regenerated periodically ----
  const liveTrack = document.getElementById('liveTrack');
  const INFO_LINES = [
    () => `⚡ <b>${8 + Math.floor(Math.random()*40)} लोग</b> अभी यह पेज देख रहे हैं`,
    () => `⚡ पिछले 1 घंटे में <b>${20 + Math.floor(Math.random()*60)} ऑर्डर</b>`,
    () => `⏰ ऑफर सीमित समय के लिए — जल्दी करें`,
    () => `🇮🇳 पूरे भारत से लोग अभी ऑर्डर कर रहे हैं`
  ];
  function buildLiveTickerEntries(count){
    const entries = [];
    for(let i=0;i<count;i++){
      if(i % 4 === 3){
        entries.push(INFO_LINES[Math.floor(Math.random()*INFO_LINES.length)]());
      } else {
        const p = randomPerson();
        entries.push(`🔥 <b>${p.name}</b>, ${p.city} ने अभी ऑर्डर किया`);
      }
    }
    return entries;
  }
  function renderLiveTicker(){
    const entries = buildLiveTickerEntries(40);
    const doubled = entries.concat(entries); // duplicate for seamless loop
    liveTrack.innerHTML = doubled.map(t => `<span>${t}</span>`).join('');
  }
  renderLiveTicker();
  setInterval(renderLiveTicker, 28000);

  // ---- Coin auto-rotates via CSS; pauses on hover/focus for readability ----

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq-item').forEach(item=>{
    item.querySelector('.faq-q').addEventListener('click', ()=>{
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
      if(!wasOpen) item.classList.add('open');
    });
  });

  // ---- Quantity + price sync (in modal) ----
  const UNIT_PRICE = 499;
  let qty = 1;
  const qtyVal = document.getElementById('qtyVal');
  const totalPrice = document.getElementById('totalPrice');
  const payAmount = document.getElementById('payAmount');
  const cartBadge = document.getElementById('cartBadge');
  function renderQty(){
    qtyVal.textContent = qty;
    totalPrice.textContent = '₹' + (qty*UNIT_PRICE).toLocaleString('en-IN');
    payAmount.textContent = (qty*UNIT_PRICE).toLocaleString('en-IN');
    cartBadge.textContent = qty;
  }
  document.getElementById('qtyPlus').addEventListener('click', ()=>{ qty = Math.min(qty+1, 20); renderQty(); });
  document.getElementById('qtyMinus').addEventListener('click', ()=>{ qty = Math.max(qty-1, 1); renderQty(); });

  // ---- Sticky CTA visibility ----
  const stickyCta = document.getElementById('stickyCta');
  const heroSection = document.querySelector('.hero');
  const orderSection = document.getElementById('order');
  window.addEventListener('scroll', ()=>{
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    const orderTop = orderSection.getBoundingClientRect().top;
    if(heroBottom < 0 && orderTop > window.innerHeight*0.5){
      stickyCta.classList.add('show');
    } else {
      stickyCta.classList.remove('show');
    }
  });

  // ---- Modal ----
  const modalOverlay = document.getElementById('modalOverlay');
  function openModal(){ modalOverlay.classList.add('show'); document.body.style.overflow='hidden'; }
  function closeModal(){ modalOverlay.classList.remove('show'); document.body.style.overflow=''; }
  document.getElementById('openModalBtn').addEventListener('click', openModal);
  document.getElementById('stickyBuyBtn').addEventListener('click', openModal);
  document.getElementById('cartBtn').addEventListener('click', openModal);
  document.getElementById('modalClose').addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e)=>{ if(e.target === modalOverlay) closeModal(); });
  document.querySelectorAll('.heroBuyBtn').forEach(btn=>{
    btn.addEventListener('click', (e)=>{ e.preventDefault(); openModal(); });
  });

  // ---- Order form -> WhatsApp (COD) ----
  // NOTE: replace WHATSAPP_NUMBER with your real WhatsApp business number (country code + number, no + or spaces)
  const WHATSAPP_NUMBER = "91XXXXXXXXXX";
  document.getElementById('orderForm').addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('fName').value.trim();
    const phone = document.getElementById('fPhone').value.trim();
    const address = document.getElementById('fAddress').value.trim();
    const pin = document.getElementById('fPin').value.trim();
    const total = qty * UNIT_PRICE;
    const msg =
`नमस्ते Shreemudra 🙏
मुझे यह ऑर्डर करना है (Cash on Delivery):

उत्पाद: Pranav Lakshmi-Ganesh Mudra
मात्रा: ${qty}
कुल राशि: ₹${total}

नाम: ${name}
मोबाइल: ${phone}
पिनकोड: ${pin}
पता: ${address}

कृपया ऑर्डर कन्फर्म करें। धन्यवाद।`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  });

  // ---- Pay Online button -> payment gateway link ----
  // NOTE: replace PAYMENT_LINK with your real payment gateway link (Razorpay/Instamojo/PayU payment page URL)
  const PAYMENT_LINK = "https://your-payment-link-here.example.com";
  document.getElementById('payOnlineBtn').addEventListener('click', function(){
    window.open(PAYMENT_LINK, '_blank');
  });

  // ---- Live decreasing stock counter ----
  let stock = 37;
  const stockNums = document.querySelectorAll('.stockNum');
  const stockFills = document.querySelectorAll('.stockFill');
  function renderStock(){
    stockNums.forEach(el=>el.textContent = stock);
    stockFills.forEach(el=>el.style.width = Math.max(stock,8) + '%');
  }
  renderStock();
  function tickStock(){
    if(stock > 9){ stock -= 1; renderStock(); }
    const next = 15000 + Math.random()*20000;
    setTimeout(tickStock, next);
  }
  setTimeout(tickStock, 9000);

  // ---- Countdown timer (all instances) ----
  function startCountdown(startSeconds){
    let remaining = startSeconds;
    const hEls = document.querySelectorAll('.cd-h');
    const mEls = document.querySelectorAll('.cd-m');
    const sEls = document.querySelectorAll('.cd-s');
    function render(){
      const h = Math.floor(remaining/3600);
      const m = Math.floor((remaining%3600)/60);
      const s = remaining%60;
      const pad = n => String(n).padStart(2,'0');
      hEls.forEach(el=>el.textContent = pad(h));
      mEls.forEach(el=>el.textContent = pad(m));
      sEls.forEach(el=>el.textContent = pad(s));
    }
    render();
    setInterval(()=>{
      remaining--;
      if(remaining < 0) remaining = startSeconds;
      render();
    }, 1000);
  }
  startCountdown(2*3600 + 17*60 + 36);

  // ---- Just bought toast (uses shared random name pool) ----
  const jb = document.getElementById('justBought');
  const jbName = document.getElementById('jbName');
  function showJustBought(){
    const p = randomPerson();
    jbName.textContent = `${p.name}, ${p.city}`;
    jb.classList.add('show');
    setTimeout(()=>{ jb.classList.remove('show'); }, 4200);
  }
  setTimeout(showJustBought, 4000);
  setInterval(showJustBought, 11000);
