import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/restaurant-list/restaurant-list')
        .then(m => m.RestaurantListComponent),
  }
,{
       path: 'restaurants/soft',
       loadComponent: () =>
         import('./components/restaurant-soft/restaurant-soft')
           .then(m => m.RestaurantSoftComponent)
     },
  {
    path: 'restaurants/add',
    loadComponent: () =>
      import('./components/restaurant-add/restaurant-add')
        .then(m => m.RestaurantAddComponent)
  },
 {
        path: 'restaurants/edit/:id',
        loadComponent: () =>
          import('./components/restaurant-edit/restaurant-edit')
            .then(m => m.RestaurantEditComponent)
      }
    ,
  {
    path: 'restaurants/:id',
    loadComponent: () =>
      import('./components/restaurant-detail/restaurant-detail')
        .then(m => m.RestaurantDetailComponent)
  },
   { path: 'menus/:id', loadComponent: () =>
             import('./components/menu-list/menu-list')
               .then(m => m.MenuListComponent)
         },


         { path: 'restaurants/:id/menus/add', loadComponent: () =>
             import('./components/menu-add/menu-add')
               .then(m => m.MenuAddComponent),
               pathMatch: 'full'
         },

         { path: 'menus/edit/:id', loadComponent: () =>
             import('./components/menu-edit/menu-edit')
               .then(m => m.MenuEditComponent),
               pathMatch: 'full'
         },
       { path: 'settings', loadComponent: () =>
                    import('./components/settings/settings')
                      .then(m => m.SettingsComponent),
                      pathMatch: 'full'
                }


];
