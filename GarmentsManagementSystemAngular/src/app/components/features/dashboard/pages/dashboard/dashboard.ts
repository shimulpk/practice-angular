import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DashboardResponse } from '../../models/dashboard-response';
import { DashboardService } from '../../services/dashboard.service';
import { StorageService } from '../../../auth/services/storage.service';
import { Role } from '../../../user/models/role';
import { AdminDashboard } from '../admin-dashboard/admin-dashboard';
import { MerchandiserDashboard } from '../merchandiser-dashboard/merchandiser-dashboard';
import { StoreDashboard } from '../store-dashboard/store-dashboard';

@Component({
  selector: 'app-dashboard',
   standalone: true,
  imports: [CommonModule, AdminDashboard, MerchandiserDashboard,StoreDashboard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{

  role: Role | null = null;

  isAdmin = false;

  isMerchandiser = false;

  isStoreManager = false;

  isPurchaseManager = false;

  isProductionManager = false;

  isCuttingManager = false;

  isSewingManager = false;

  isFinishingManager = false;

  isPackingManager = false;

  constructor(
    private storageService: StorageService
  ) {}

  ngOnInit(): void {

    this.role = this.storageService.getRole() as Role;

   

    this.isAdmin = this.role === Role.ADMIN;

   

    this.isMerchandiser = this.role === Role.MERCHANDISER;
    

    this.isStoreManager = this.role === Role.STORE_MANAGER;

    this.isPurchaseManager = this.role === Role.PURCHASE_MANAGER;

    this.isProductionManager = this.role === Role.PRODUCTION_MANAGER;

    this.isCuttingManager = this.role === Role.CUTTING_MANAGER;

    this.isSewingManager = this.role === Role.SEWING_MANAGER;

    this.isFinishingManager = this.role === Role.FINISHING_MANAGER;

    this.isPackingManager = this.role === Role.PACKING_MANAGER;

  }



}
