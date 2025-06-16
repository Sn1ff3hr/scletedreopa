document.addEventListener('DOMContentLoaded', () => {
  function toFloat(v) { return parseFloat(v) || 0; }

  function updateCalculatedFields() {
    const s = toFloat(document.getElementById('subtotal').value);
    const v = toFloat(document.getElementById('vat').value) / 100;
    const q = toFloat(document.getElementById('quantity').value);
    const f = toFloat(document.getElementById('futureSelling').value);

    const totalPaid = s * (1 + v);
    document.getElementById('totalPaid').value = isFinite(totalPaid) ? totalPaid.toFixed(2) : '0.00';

    const unitPrice = q ? s / q : 0;
    document.getElementById('unitPrice').value = unitPrice.toFixed(2);

    const futureEarnings = f * q;
    document.getElementById('futureEarnings').value = isFinite(futureEarnings) ? futureEarnings.toFixed(2) : '0.00';

    const up = toFloat(document.getElementById('unitPrice').value);
    const grossMargin = up ? ((f - up) / up * 100) : 0;
    document.getElementById('grossMargin').value = isFinite(grossMargin) ? grossMargin.toFixed(2) : '0.00';
  }

  ['subtotal', 'vat', 'quantity', 'futureSelling'].forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('input', updateCalculatedFields);
    }
  });

  const productForm = document.getElementById('productForm');
  if (productForm) {
    productForm.addEventListener('submit', function(e) {
      e.preventDefault();
      updateCalculatedFields();

      const row = document.createElement('tr');
      row.innerHTML = [
        'assetId', 'productName', 'quantity', 'subtotal', 'vat', 'totalPaid',
        'unitPrice', 'futureSelling', 'futureVat', 'futureEarnings', 'grossMargin'
      ].map(id => {
        const value = document.getElementById(id)?.value;
        return `<td>${value !== undefined ? value : '-'}</td>`;
      }).join('');

      const tbody = document.querySelector('#inventoryTable tbody');
      if (tbody) {
        tbody.appendChild(row);
      }

      this.reset();
      updateCalculatedFields();

      const imgPreview = document.getElementById('imgPreview');
      if (imgPreview) {
        imgPreview.innerHTML = '📷';
      }
    });
  }

  const cameraBtn = document.getElementById('cameraBtn');
  const uploadImgInput = document.getElementById('uploadImg');

  if (cameraBtn && uploadImgInput) {
    cameraBtn.addEventListener('click', () => uploadImgInput.click());
  }

  if (uploadImgInput) {
    uploadImgInput.addEventListener('change', function() {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const imgPreview = document.getElementById('imgPreview');
          if (imgPreview) {
            imgPreview.innerHTML = '';
            const img = document.createElement('img');
            img.src = e.target.result;
            imgPreview.appendChild(img);
          }
        };
        reader.readAsDataURL(this.files[0]);
      }
    });
  }

  const scanBtn = document.getElementById('scanBtn');
  if (scanBtn) {
    scanBtn.addEventListener('click', () => alert('Scanner feature coming soon!'));
  }

  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
  }

  updateCalculatedFields();
});
