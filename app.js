const navButtons = document.querySelectorAll('.nav-btn');
const screens = document.querySelectorAll('.screen');
const screenTitle = document.getElementById('screen-title');
const themeToggle = document.getElementById('theme-toggle');
const brandLogo = document.querySelector('.brand-logo');

const applyTheme = (theme) => {
  document.body.dataset.theme = theme;

  if (themeToggle) {
    themeToggle.checked = theme === 'light';
  }

  if (brandLogo) {
    const darkSrc = brandLogo.dataset.darkSrc;
    const lightSrc = brandLogo.dataset.lightSrc;
    brandLogo.src = theme === 'light' ? lightSrc : darkSrc;
  }

  window.localStorage.setItem('super-basic-crm-theme', theme);
};

const savedTheme = window.localStorage.getItem('super-basic-crm-theme');
applyTheme(savedTheme === 'light' ? 'light' : 'dark');

if (themeToggle) {
  themeToggle.addEventListener('change', () => {
    applyTheme(themeToggle.checked ? 'light' : 'dark');
  });
}

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    navButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const target = button.dataset.target;
    screens.forEach((screen) => {
      screen.classList.toggle('active', screen.id === target);
    });

    const label = button.textContent ? button.textContent.trim() : 'Dashboard';
    screenTitle.textContent = label;
  });
});

const lineTableBody = document.querySelector('#line-table tbody');
const subtotalCell = document.getElementById('subtotal');
const paperTotal = document.getElementById('paper-total');
const addRowButton = document.getElementById('add-row');

const currency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
};

const updateTotals = () => {
  let subtotal = 0;
  lineTableBody.querySelectorAll('tr').forEach((row) => {
    const qtyInput = row.querySelector('.qty');
    const priceInput = row.querySelector('.price');
    const totalCell = row.querySelector('.line-total');

    const qty = Number(qtyInput.value || 0);
    const price = Number(priceInput.value || 0);
    const lineTotal = qty * price;

    totalCell.textContent = currency(lineTotal);
    subtotal += lineTotal;
  });

  subtotalCell.textContent = currency(subtotal);
  paperTotal.textContent = currency(subtotal);
};

addRowButton.addEventListener('click', () => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td contenteditable="true">Custom line item description</td>
    <td><input value="1" type="number" min="1" class="qty" /></td>
    <td><input value="0" type="number" min="0" class="price" /></td>
    <td class="line-total">$0.00</td>
  `;
  lineTableBody.appendChild(row);
  bindQuoteInputs();
  updateTotals();
});

const bindQuoteInputs = () => {
  lineTableBody.querySelectorAll('.qty, .price').forEach((input) => {
    input.removeEventListener('input', updateTotals);
    input.addEventListener('input', updateTotals);
  });
};

bindQuoteInputs();
updateTotals();

const templateButtons = document.querySelectorAll('.toggle-btn');
const templateNote = document.getElementById('template-note');
const paperPreview = document.getElementById('paper-preview');
const paperBadge = document.getElementById('paper-badge');
const switchTemplateButton = document.getElementById('switch-template');

const applyTemplate = (template) => {
  templateButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.template === template);
  });

  if (template === 'account') {
    templateNote.textContent = 'Account format selected (green style with terms).';
    paperBadge.textContent = 'Account / Terms 10 Net 30';
    paperBadge.style.background = '#dcefdc';
    paperPreview.classList.remove('cash-look');
    paperPreview.classList.add('account-look');
  } else {
    templateNote.textContent = 'Cash format selected (blue/white style).';
    paperBadge.textContent = 'Cash / Due on Receipt';
    paperBadge.style.background = '#d9e8f2';
    paperPreview.classList.remove('account-look');
    paperPreview.classList.add('cash-look');
  }
};

templateButtons.forEach((button) => {
  button.addEventListener('click', () => applyTemplate(button.dataset.template));
});

switchTemplateButton.addEventListener('click', () => {
  const current = document.querySelector('.toggle-btn.active')?.dataset.template;
  applyTemplate(current === 'cash' ? 'account' : 'cash');
});

const convertButton = document.getElementById('convert-btn');
const convertResult = document.getElementById('convert-result');
const approvalStage = document.getElementById('approval-stage');

convertButton.addEventListener('click', () => {
  approvalStage.classList.remove('current');
  approvalStage.classList.add('done');

  const stages = document.querySelectorAll('.stage');
  if (stages[3]) {
    stages[3].classList.add('current', 'done');
    stages[3].textContent = '4. Converted To Order #ORD-7714';
  }

  convertResult.textContent = 'Converted successfully. Created Order #ORD-7714 and invoice draft #INV-7714.';
});

const deliveryButtons = document.querySelectorAll('.delivery-btn');
const deliveryNote = document.getElementById('delivery-note');

deliveryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    deliveryButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    if (button.dataset.mode === 'tablet') {
      deliveryNote.textContent =
        'Tablet mode: capture customer signature, attach delivery photos, and save directly to the order record.';
    } else {
      deliveryNote.textContent =
        'Plain black-and-white layout with compact spacing for carbon-copy ticket stock.';
    }
  });
});

const vendorPills = document.querySelectorAll('.vendor-pill');
vendorPills.forEach((pill) => {
  pill.addEventListener('click', () => {
    vendorPills.forEach((node) => node.classList.remove('active'));
    pill.classList.add('active');
  });
});
