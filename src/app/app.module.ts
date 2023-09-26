import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTreeModule } from '@angular/material/tree';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordDialogComponent } from './forgot-password-dialog/forgot-password-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProgressSpinnerOverlayComponent } from './progress-spinner-overlay/progress-spinner-overlay.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { ErrorComponent } from './error/error.component';
import { SinhvienComponent } from './admin/sinhvien/sinhvien.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LayoutComponent } from './layout/layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ChecktokenComponent } from './checktoken/checktoken.component';
import { LopComponent } from './admin/lop/lop.component';
import { DialogLopComponent } from './admin/dialog/dialog-lop/dialog-lop.component';
import { DialogSinhvienComponent } from './admin/dialog/dialog-sinhvien/dialog-sinhvien.component';
import { KhoaComponent } from './admin/khoa/khoa.component';
import { DialogKhoaComponent } from './admin/dialog/dialog-khoa/dialog-khoa.component';
import { ChartModule } from 'primeng/chart';
import { ChartComponent } from './admin/chart/chart.component';
import { DockModule } from 'primeng/dock';
import { TestComponent } from './test/test.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CustomPaginatorIntl } from './custom-paginator-intl';
import { MatSortModule } from '@angular/material/sort';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerComponent } from './admin/pdf-viewer/pdf-viewer.component';
import { PdfDialogComponent } from './admin/dialog/pdf-dialog/pdf-dialog.component';
import { ProvinceListComponent } from './admin/province-list/province-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FileUploadComponent } from './admin/file-upload/file-upload.component';
import { CalendarModule } from 'primeng/calendar';
import { DelUploadComponent } from './admin/dialog/del-upload/del-upload.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { DonviComponent } from './admin/donvi/donvi.component';
import { DialogDonviComponent } from './admin/dialog/dialog-donvi/dialog-donvi.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ForgotPasswordDialogComponent,
    ProgressSpinnerOverlayComponent,
    UserComponent,
    AdminComponent,
    ErrorComponent,
    SinhvienComponent,
    LayoutComponent,
    ChecktokenComponent,
    LopComponent,
    DialogLopComponent,
    DialogSinhvienComponent,
    KhoaComponent,
    DialogKhoaComponent,
    ChartComponent,
    TestComponent,
    PdfViewerComponent,
    PdfDialogComponent,
    ProvinceListComponent,
    FileUploadComponent,
    DelUploadComponent,
    DonviComponent,
    DialogDonviComponent,
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    CalendarModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSelectModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    ChartModule,
    DockModule,
    RadioButtonModule,
    MatSortModule,
    NgxExtendedPdfViewerModule,
    MatTreeModule,
    MatRadioModule,
    MatCardModule,
    ToastrModule.forRoot({
      timeOut: 1500, // Thiết lập thời gian tồn tại là 1,5 giây
      progressBar: true, // Hiển thị thanh tiến trình
      progressAnimation: 'increasing',
    }),
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: CustomPaginatorIntl, // Sử dụng custom PaginatorIntl
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translations/', '.json');
}
