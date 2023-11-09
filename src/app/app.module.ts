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
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastNoAnimation, ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { ChecktokenComponent } from './checktoken/checktoken.component';
import { LopComponent } from './admin/lop/lop.component';
import { DialogLopComponent } from './admin/dialog/dialog-lop/dialog-lop.component';
import { DialogSinhvienComponent } from './admin/dialog/dialog-sinhvien/dialog-sinhvien.component';
import { KhoaComponent } from './admin/khoa/khoa.component';
import { DialogKhoaComponent } from './admin/dialog/dialog-khoa/dialog-khoa.component';
import { ChartModule } from 'primeng/chart';
import { ChartComponent } from './admin/chart/chart.component';
import { DockModule } from 'primeng/dock';
import { TestComponent } from './user/test/test.component';
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
import { HeaderComponent } from './user/layout/header/header.component';
import { SidebarModule } from 'primeng/sidebar';
import { DangkiThuctapComponent } from './user/dangki-thuctap/dangki-thuctap.component';
import { DangkiCoquanComponent } from './user/dangki-coquan/dangki-coquan.component';
import { FooterComponent } from './user/footer/footer.component';
import { ThongtinSinhvienComponent } from './user/thongtin-sinhvien/thongtin-sinhvien.component';
import { DialogPdfComponent } from './user/dialog/dialog-pdf/pdf-dialog.component';
import { ThongtinDangkiComponent } from './user/thongtin-dangki/thongtin-dangki.component';
import { KetquaThuctapComponent } from './user/ketqua-thuctap/ketqua-thuctap.component';
import { DangkiCuatoiComponent } from './user/dangki-cuatoi/dangki-cuatoi.component';
import { TrangThaiPipeComponent } from './trang-thai.pipe/trang-thai.pipe.component';
import { CapnhatThongtinComponent } from './user/capnhat-thongtin/capnhat-thongtin.component';
import { DotthuctapComponent } from './admin/dotthuctap/dotthuctap.component';
import { GiangvienComponent } from './admin/giangvien/giangvien.component';
import { DialogDotComponent } from './admin/dialog/dialog-dot/dialog-dot.component';
import { DialogGiangvienComponent } from './admin/dialog/dialog-giangvien/dialog-giangvien.component';
import { PageGiangvienComponent } from './giangvien/page-giangvien/page-giangvien.component';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { PicklistComponent } from './picklist/picklist.component';
import { PickListModule } from 'primeng/picklist';
import { ThoigianDangkyComponent } from './admin/thoigian-dangky/thoigian-dangky.component';
import { DialogThoigianDangkyComponent } from './admin/dialog/dialog-thoigian-dangky/dialog-thoigian-dangky.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HuongdanComponent } from './user/huongdan/huongdan.component';
import { MatStepperModule } from '@angular/material/stepper';
import { TruncatePipe } from './truncate.pipe';
import { PhancongGiangvienComponent } from './admin/phancong-giangvien/phancong-giangvien.component';
import { TagModule } from 'primeng/tag';
import { DialogPhancongGiangvienComponent } from './admin/dialog/dialog-phancong-giangvien/dialog-phancong-giangvien.component';
import { InputTextModule } from 'primeng/inputtext';
import { CongviecCuatoiComponent } from './user/congviec-cuatoi/congviec-cuatoi.component';
import { CongviecTuanComponent } from './user/congviec-tuan/congviec-tuan.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressBarModule } from 'primeng/progressbar';
import { PhieudiemCanboComponent } from './admin/phieudiem-canbo/phieudiem-canbo.component';
import { DialogPhieudiemCanboComponent } from './admin/dialog/dialog-phieudiem-canbo/dialog-phieudiem-canbo.component';
import { MucDanhgiaCanboComponent } from './admin/muc-danhgia-canbo/muc-danhgia-canbo.component';
import { NgParticlesModule } from 'ng-particles';
import { KnobModule } from 'primeng/knob';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { HeaderGiangvienComponent } from './giangvien/layout/header-giangvien/header-giangvien.component';
import { FooterGiangvienComponent } from './giangvien/layout/footer-giangvien/footer-giangvien.component';
import { ThongtinGiangvienComponent } from './giangvien/thongtin-giangvien/thongtin-giangvien.component';
import { DiemSinhvienComponent } from './giangvien/diem-sinhvien/diem-sinhvien.component';
import { SuaThongtinComponent } from './giangvien/sua-thongtin/sua-thongtin.component';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { MultilevelMenuService } from 'ng-material-multilevel-menu';
import { PhieudiemGiangvienComponent } from './admin/phieudiem-giangvien/phieudiem-giangvien.component';
import { DialogMucCanboComponent } from './admin/dialog/dialog-muc-canbo/dialog-muc-canbo.component';
import { DialogMucGiangvienComponent } from './admin/dialog/dialog-muc-giangvien/dialog-muc-giangvien.component';
import { MucDanhgiaGiangvienComponent } from './admin/muc-danhgia-giangvien/muc-danhgia-giangvien.component';
import { DialogPhieudiemGiangvienComponent } from './admin/dialog/dialog-phieudiem-giangvien/dialog-phieudiem-giangvien.component';
import { DsSinhvienComponent } from './giangvien/ds-sinhvien/ds-sinhvien.component';
import { GalleriaModule } from 'primeng/galleria';
import { GalleriaComponent } from './galleria/galleria.component';
import { FilterPipe } from './filter.pipe';
import { FilterByMucPipe } from './filter-by-muc.pipe';
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
    DialogPdfComponent,
    ProvinceListComponent,
    FileUploadComponent,
    DelUploadComponent,
    DonviComponent,
    DialogDonviComponent,
    HeaderComponent,
    DangkiThuctapComponent,
    DangkiCoquanComponent,
    FooterComponent,
    ThongtinSinhvienComponent,
    ThongtinDangkiComponent,
    KetquaThuctapComponent,
    DangkiCuatoiComponent,
    TrangThaiPipeComponent,
    CapnhatThongtinComponent,
    DotthuctapComponent,
    GiangvienComponent,
    DialogDotComponent,
    DialogGiangvienComponent,
    PageGiangvienComponent,
    PicklistComponent,
    ThoigianDangkyComponent,
    DialogThoigianDangkyComponent,
    HuongdanComponent,
    TruncatePipe,
    PhancongGiangvienComponent,
    DialogPhancongGiangvienComponent,
    CongviecCuatoiComponent,
    CongviecTuanComponent,
    PhieudiemCanboComponent,
    DialogPhieudiemCanboComponent,
    MucDanhgiaCanboComponent,
    HeaderGiangvienComponent,
    FooterGiangvienComponent,
    ThongtinGiangvienComponent,
    DiemSinhvienComponent,
    SuaThongtinComponent,
    PhieudiemGiangvienComponent,
    DialogMucCanboComponent,
    DialogMucGiangvienComponent,
    MucDanhgiaGiangvienComponent,
    DialogPhieudiemGiangvienComponent,
    DsSinhvienComponent,
    GalleriaComponent,
    FilterPipe,
    FilterByMucPipe,
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    PickListModule,
    PasswordModule,
    DropdownModule,
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
    SidebarModule,
    MatTabsModule,
    MatStepperModule,
    TagModule,
    InputTextModule,
    CheckboxModule,
    ProgressBarModule,
    NgParticlesModule,
    KnobModule,
    MatProgressBarModule,
    MatSliderModule,
    NgMaterialMultilevelMenuModule,
    GalleriaModule,
    ToastNoAnimationModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 1500,
      closeButton: true,
      progressBar: true, // Hiển thị thanh tiến trình
      progressAnimation: 'increasing',
      preventDuplicates: true,
      toastComponent: ToastNoAnimation,
    }),
  ],
  providers: [
    MultilevelMenuService,
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
