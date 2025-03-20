export function createUserInfoItem(title, value) {
  const container = document.createElement('div');
  container.className = 'tenant-info-item';
  
  container.innerHTML = `
    <p class="tenant-info-item-title">${title}</p>
    <p class="tenant-info-item-value">${value}</p>
  `;

  return container;
}
