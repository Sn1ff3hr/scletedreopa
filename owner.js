document.addEventListener('DOMContentLoaded', () => {
  function toFloat(v) { return parseFloat(v) || 0; }

  function updateCalculatedFields() {
    const s = toFloat(document.getElementById('subtotal').value);
    const v = toFloat(document.getElementById('vat').value) / 100;
    const q = toFloat(document.getElementById('quantity').value);
    const f = toFloat(document.getElementById('futureSelling').value);

    document.getElementById('totalPaid').value = (s * (1 + v) || '').toFixed(2);
    document.getElementById('unitPrice').value = (q ? s / q : 0 || '').toFixed(2);
    document.getElementById('futureEarnings').value = (f * q || '').toFixed(2);

    const up = toFloat(document.getElementById('unitPrice').value);
    document.getElementById('grossMargin').value = (up ? ((f - up) / up * 100) : 0 || '').toFixed(2);
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
      row.innerHTML = ['assetId', 'productName', 'quantity', 'subtotal', 'vat', 'totalPaid', 'unitPrice', 'futureSelling', 'futureVat', 'futureEarnings', 'grossMargin']
        .map(id => `<td>${document.getElementById(id).value || '-'}</td>`)
        .join('');

      const tbody = document.querySelector('#inventoryTable tbody');
      if (tbody) {
        tbody.appendChild(row);
      }

      this.reset();
      updateCalculatedFields(); // Recalculate for placeholder values

      const imgPreview = document.getElementById('imgPreview');
      if (imgPreview) {
        imgPreview.innerHTML = '📷'; // Reset image preview
      }
    });
  }

  const cameraBtn = document.getElementById('cameraBtn');
  const uploadImgInput = document.getElementById('uploadImg'); // Ensure this input exists in HTML

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
            imgPreview.innerHTML = ''; // Clear previous content (e.g., the camera icon)
            const img = document.createElement('img');
            img.src = e.target.result;
            // Styling is handled by '.image-preview img' in owner.css
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

  // Initial calculation for empty fields if needed, or for pre-filled forms
  updateCalculatedFields();
});
