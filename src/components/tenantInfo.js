import { getInitials } from "../utils/getInitials";
import { createTenantsDropdown } from "./tenantsDropdown";

function loadMembersCount(fronteggInstance) {
  const baseUrl = fronteggInstance.store.getState().root.context.baseUrl;
  const url = `${baseUrl}/frontegg/identity/resources/users/v2?_offset=0&_limit=100&_includeSubTenants=false`;
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${
        fronteggInstance.store.getState().auth.user.accessToken
      }`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const membersCount = document.getElementById("members-count");
      if (!membersCount) {
        return;
      }
      if (data && data._metadata) {
        membersCount.textContent = data._metadata.totalItems.toString();
      } else {
        membersCount.textContent = "-";
      }
    });
}

export function createTenantInfo(
  tenants,
  activeTenant,
  onSwitchTenant,
  fronteggInstance
) {
  const container = document.createElement("div");
  container.className = "tenant-card";

  if (!tenants || !activeTenant) {
    return container;
  }

  const content = `
    <div class="tenant-title-wrapper">
      <div class="tenant-title">
        <div class="tenant-logo">
          <div class="initials">${getInitials(activeTenant.name)}</div>
        </div>
        <p class="tenant-name">${activeTenant.name}</p>
      </div>
    </div>
    <div class="tenant-info">
      <div class="tenant-info-item">
        <p class="tenant-info-item-title">ID</p>
        <p class="tenant-info-item-value">${activeTenant.tenantId}</p>
      </div>

      <div class="tenant-info-item">
        <p class="tenant-info-item-title">Members</p>
        <p class="tenant-info-item-value" id="members-count">loading...</p>
      </div>

      <div class="tenant-info-item">
        <p class="tenant-info-item-title">Creator</p>
        <p class="tenant-info-item-value">${
          activeTenant.creatorEmail || "system"
        }</p>
      </div>
    </div>
  `;

  container.innerHTML = content;

  // Add tenants dropdown if there are multiple tenants
  if (tenants && tenants.length > 0) {
    const titleWrapper = container.querySelector(".tenant-title-wrapper");
    const dropdown = createTenantsDropdown(
      tenants,
      activeTenant,
      onSwitchTenant
    );
    titleWrapper.appendChild(dropdown);
  }

  // Add edit account button
  const editButton = document.createElement("button");
  editButton.className = "secondary-button edit-button";
  editButton.textContent = "Edit account";
  editButton.addEventListener("click", () => {
    window.location.href = "#/admin-box/account";
    fronteggInstance.showAdminPortal();
  });
  container.appendChild(editButton);

  // Load members count
  loadMembersCount(fronteggInstance);
  return container;
}
