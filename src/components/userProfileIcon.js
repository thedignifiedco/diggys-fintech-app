import { getInitials } from '../utils/getInitials';

export function createUserProfileIcon(user) {
  const container = document.createElement('div');
  container.className = 'tenant-logo';

  if (user.profilePictureUrl) {
    const img = document.createElement('img');
    img.src = user.profilePictureUrl;
    img.alt = `${user.name}'s profile`;
    img.width = 24;
    img.height = 24;
    
    img.onerror = (e) => {
      e.target.style.display = 'none';
      container.innerHTML = `<div class="initials" role="img" aria-label="User initials">${getInitials(user.name)}</div>`;
    };
    
    container.appendChild(img);
  } else {
    container.innerHTML = `<div class="initials" role="img" aria-label="User initials">${getInitials(user.name)}</div>`;
  }

  return container;
}
