<script>
import "../assets/css/content.css";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { accountService, fileService } from "@/services/service";
import Swal from "sweetalert2";

export default {
  props: {
    myParam: {
      type: String,
      default: "",
    },
    dvsItems: {
      type: Array,
      required: true,
    },
    dvsItem: {
      type: Object,
      required: true,
    },
    hdsdcItem: {
      type: Object,
      required: true,
    },
    pbhdsdcItem: {
      type: Object,
      required: true,
    },
    phItem: {
      type: Object,
      required: true,
    },
    cnItem: {
      type: Object,
      required: true,
    },
    lItem: {
      type: Object,
      required: true,
    },
    hdsdItem: {
      type: Object,
      required: true,
    },
    pbhdsdItem: {
      type: Object,
      required: true,
    },
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  async created() {
    const accountData = localStorage.getItem("account");
    if (accountData) {
      this.account = JSON.parse(accountData);
    }
    await this.checkAuthentication();
    try {
      this.optionsDvs = await accountService.layDichVuSo();
      this.optionsPh = await accountService.layPhanHeChucNang();
      this.optionsCn = await accountService.layChucNang();
      this.optionsLoai = await accountService.layLoaiHDSD();
      this.optionsHdsd = await accountService.layHDSD();
    } catch (error) {
      console.log(error);
    }
    if (this.accountInfo.Quyen === "Admin") {
      this.isAdmin = true;
    }
  },
  data() {
    const FormSchemaUpdateDvs = yup.object().shape({
      tendvsmoi: yup
        .string()
        .required("Vui lòng nhập tên dịch vụ số mới.")
        .min(8, "Tên dịch vụ số phải có ít nhất 8 ký tự.")
        .max(255, "Tên dịch vụ số không được vượt quá 255 ký tự.")
        .matches(
          /^[a-zA-Z0-9\sÀÁÃẢẠÂẦẤẨẪẬĂẮẰẲẴẶÈÉẼẺẸẾÊỀỂỄỆỈÍÌỊĨỌỎÒÓÕÔỒỔỖỐỘỚỜỞỠỢƠƯỨỪỬỮỰÙÚỤỦŨÝỶỸỴỲỳýỵỷỹđĐàáãạảâầấẩẫậăắằẳẵặẽẻẹèéêềếệểễìíịỉĩòóỏõọôồốổỗộơởờớỡợùúụủũưứừửữựỳýỵỷỹ\s]*$/,
          "Tên dịch vụ số không được có ký tự đặc biệt."
        )
        .test(
          "unique",
          "Tên dịch vụ số đã tồn tại.",
          async function (value) {
            if (
              value &&
              value !==
              this.optionsDvs.find(
                (element) => element.MADV === this.optionDvs
              ).TENDV
            ) {
              const isUnique = await accountService.kiemTraTonTaiDichVuSo(
                value
              );
              return !isUnique;
            }
            return true;
          }.bind(this)
        ),
    });

    const FormSchemaUpdatePh = yup.object().shape({
      tenphmoi: yup
        .string()
        .required("Vui lòng nhập tên phân hệ chức năng mới.")
        .min(8, "Tên phân hệ chức năng mới phải có ít nhất 8 ký tự.")
        .max(255, "Tên phân hệ chức năng mới không vượt quá 255 ký tự.")
        .matches(
          /^[a-zA-Z0-9\sÀÁÃẢẠÂẦẤẨẪẬĂẮẰẲẴẶÈÉẼẺẸẾÊỀỂỄỆỈÍÌỊĨỌỎÒÓÕÔỒỔỖỐỘỚỜỞỠỢƠƯỨỪỬỮỰÙÚỤỦŨÝỶỸỴỲỳýỵỷỹđĐàáãạảâầấẩẫậăắằẳẵặẽẻẹèéêềếệểễìíịỉĩòóỏõọôồốổỗộơởờớỡợùúụủũưứừửữựỳýỵỷỹ\s]*$/,
          "Tên phân hệ chức năng mới không được có ký tự đặc biệt."
        )
        .test(
          "unique",
          "Tên phân hệ chức năng đã tồn tại.",
          async function (value) {
            if (
              value &&
              value !==
              this.optionsPh.find(
                (element) => element.MAPHCN === this.optionPh
              ).TENPHCN
            ) {
              const isUnique = await accountService.kiemTraTonTaiPhanHeChucNang(
                value
              );
              return !isUnique;
            }
            return true;
          }.bind(this)
        ),
    });

    const FormSchemaUpdateCn = yup.object().shape({
      tencnmoi: yup
        .string()
        .required("Vui lòng nhập tên chức năng mới.")
        .min(8, "Tên chức năng mới phải có ít nhất 8 ký tự.")
        .max(255, "Tên chức năng mới không vượt quá 255 ký tự.")
        .matches(
          /^[a-zA-Z0-9\sÀÁÃẢẠÂẦẤẨẪẬĂẮẰẲẴẶÈÉẼẺẸẾÊỀỂỄỆỈÍÌỊĨỌỎÒÓÕÔỒỔỖỐỘỚỜỞỠỢƠƯỨỪỬỮỰÙÚỤỦŨÝỶỸỴỲỳýỵỷỹđĐàáãạảâầấẩẫậăắằẳẵặẽẻẹèéêềếệểễìíịỉĩòóỏõọôồốổỗộơởờớỡợùúụủũưứừửữựỳýỵỷỹ\s]*$/,
          "Tên chức năng mới không được có ký tự đặc biệt."
        )
        .test(
          "unique",
          "Tên chức năng đã tồn tại.",
          async function (value) {
            if (
              value &&
              value !==
              this.optionsCn.find(
                (element) => element.MACHUCNANG === this.optionCn
              ).TENCHUCNANG
            ) {
              const isUnique = await accountService.kiemTraTonTaiChucNang(
                value,
                this.optionDvs,
                this.optionPh
              );
              return !isUnique;
            }
            return true;
          }.bind(this)
        ),
    });

    const FormSchemaAddDvs = yup.object().shape({
      tendvs: yup
        .string()
        .required("Vui lòng nhập tên dịch vụ số.")
        .min(8, "Tên dịch vụ số phải có ít nhất 8 ký tự.")
        .max(255, "Tên dịch vụ số không được vượt quá 255 ký tự.")
        .matches(
          /^[a-zA-Z0-9\sÀÁÃẢẠÂẦẤẨẪẬĂẮẰẲẴẶÈÉẼẺẸẾÊỀỂỄỆỈÍÌỊĨỌỎÒÓÕÔỒỔỖỐỘỚỜỞỠỢƠƯỨỪỬỮỰÙÚỤỦŨÝỶỸỴỲỳýỵỷỹđĐàáãạảâầấẩẫậăắằẳẵặẽẻẹèéêềếệểễìíịỉĩòóỏõọôồốổỗộơởờớỡợùúụủũưứừửữựỳýỵỷỹ\s]*$/,
          "Tên dịch vụ số không được có ký tự đặc biệt."
        )
        .test("unique", "Tên dịch vụ số đã tồn tại.", async function (value) {
          const isUnique = await accountService.kiemTraTonTaiDichVuSo(value);
          return !isUnique;
        }),
    });

    const FormSchemaAddPh = yup.object().shape({
      tenph: yup
        .string()
        .required("Vui lòng nhập tên phân hệ chức năng.")
        .min(8, "Tên phân hệ chức năng phải có ít nhất 8 ký tự.")
        .max(255, "Tên phân hệ chức năng không vượt quá 255 ký tự.")
        .matches(
          /^[a-zA-Z0-9\sÀÁÃẢẠÂẦẤẨẪẬĂẮẰẲẴẶÈÉẼẺẸẾÊỀỂỄỆỈÍÌỊĨỌỎÒÓÕÔỒỔỖỐỘỚỜỞỠỢƠƯỨỪỬỮỰÙÚỤỦŨÝỶỸỴỲỳýỵỷỹđĐàáãạảâầấẩẫậăắằẳẵặẽẻẹèéêềếệểễìíịỉĩòóỏõọôồốổỗộơởờớỡợùúụủũưứừửữựỳýỵỷỹ\s]*$/,
          "Tên phân hệ chức năng không được có ký tự đặc biệt."
        )
        .test(
          "unique",
          "Tên phân hệ chức năng đã tồn tại.",
          async function (value) {
            const isUnique = await accountService.kiemTraTonTaiPhanHeChucNang(
              value
            );
            return !isUnique;
          }
        ),
    });

    const FormSchemaAddCn = yup.object().shape({
      tencn: yup
        .string()
        .required("Vui lòng nhập tên chức năng.")
        .min(8, "Tên chức năng phải có ít nhất 8 ký tự.")
        .max(255, "Tên chức năng không vượt quá 255 ký tự.")
        .matches(
          /^[a-zA-Z0-9\sÀÁÃẢẠÂẦẤẨẪẬĂẮẰẲẴẶÈÉẼẺẸẾÊỀỂỄỆỈÍÌỊĨỌỎÒÓÕÔỒỔỖỐỘỚỜỞỠỢƠƯỨỪỬỮỰÙÚỤỦŨÝỶỸỴỲỳýỵỷỹđĐàáãạảâầấẩẫậăắằẳẵặẽẻẹèéêềếệểễìíịỉĩòóỏõọôồốổỗộơởờớỡợùúụủũưứừửữựỳýỵỷỹ\s]*$/,
          "Tên chức năng không được có ký tự đặc biệt."
        )
        .test(
          "unique",
          "Tên chức năng đã tồn tại.",
          async function (value) {
            const isUnique = await accountService.kiemTraTonTaiChucNang(
              value,
              this.optionDvs,
              this.optionPh
            );
            return !isUnique;
          }.bind(this)
        ),
    });

    const FormSchemaAddHdsdc = yup.object().shape({
      tentieude: yup
        .string()
        .required("Vui lòng nhập tiêu đề hướng dẫn sử dụng chung.")
        .min(8, "Tiêu đề hướng dẫn sử dụng chung phải có ít nhất 8 ký tự.")
        .max(255, "Tiêu đề hướng dẫn sử dụng chung không vượt quá 255 ký tự.")
        .matches(
          /^[a-zA-Z0-9\sÀÁÃẢẠÂẦẤẨẪẬĂẮẰẲẴẶÈÉẼẺẸẾÊỀỂỄỆỈÍÌỊĨỌỎÒÓÕÔỒỔỖỐỘỚỜỞỠỢƠƯỨỪỬỮỰÙÚỤỦŨÝỶỸỴỲỳýỵỷỹđĐàáãạảâầấẩẫậăắằẳẵặẽẻẹèéêềếệểễìíịỉĩòóỏõọôồốổỗộơởờớỡợùúụủũưứừửữựỳýỵỷỹ\s.]*$/,
          "Tiêu đề hướng dẫn sử dụng chung không được có ký tự đặc biệt."
        )
        .test(
          "unique",
          "Tiêu đề hướng dẫn sử dụng chung đã tồn tại.",
          async function (value) {
            if (value) {
              const isUnique = await accountService.kiemTraTonTaiHDSDChung(
                value,
                this.optionDvs
              );
              return !isUnique;
            }
            return true;
          }.bind(this)
        ),
      motahdsd: yup
        .string()
        .required("Vui lòng nhập mô tả hướng dẫn sử dụng chung.")
        .min(8, "Mô tả hướng dẫn sử dụng chung phải có ít nhất 8 ký tự.")
        .max(1024, "Mô tả hướng dẫn sử dụng chung không vượt quá 1024 ký tự."),
    });

    const FormSchemaSuaHdsdc = yup.object().shape({
      tentieudem: yup
        .string()
        .required("Vui lòng nhập tiêu đề hướng dẫn sử dụng chung mới.")
        .min(8, "Tiêu đề hướng dẫn sử dụng chung mới phải có ít nhất 8 ký tự.")
        .max(
          255,
          "Tiêu đề hướng dẫn sử dụng chung mới không vượt quá 255 ký tự."
        )
        .matches(
          /^[a-zA-Z0-9\sÀÁÃẢẠÂẦẤẨẪẬĂẮẰẲẴẶÈÉẼẺẸẾÊỀỂỄỆỈÍÌỊĨỌỎÒÓÕÔỒỔỖỐỘỚỜỞỠỢƠƯỨỪỬỮỰÙÚỤỦŨÝỶỸỴỲỳýỵỷỹđĐàáãạảâầấẩẫậăắằẳẵặẽẻẹèéêềếệểễìíịỉĩòóỏõọôồốổỗộơởờớỡợùúụủũưứừửữựỳýỵỷỹ\s.]*$/,
          "Tiêu đề hướng dẫn sử dụng chung mới không được có ký tự đặc biệt."
        )
        .test(
          "unique",
          "Tiêu đề hướng dẫn sử dụng chung đã tồn tại.",
          async function (value) {
            if (
              value &&
              value !==
              this.optionsHdsdc.find(
                (element) => element.MAPHIENBAN === this.optionHdsdc
              ).TIEUDEPHIENBAN
            ) {
              const isUnique = await accountService.kiemTraTonTaiHDSDChung(
                value,
                this.optionDvs
              );
              return !isUnique;
            }
            return true;
          }.bind(this)
        ),
      motahdsdcm: yup
        .string()
        .required("Vui lòng nhập mô tả hướng dẫn sử dụng chung mới.")
        .min(8, "Mô tả hướng dẫn sử dụng chung mới phải có ít nhất 8 ký tự.")
        .max(
          1024,
          "Mô tả hướng dẫn sử dụng chung mới không vượt quá 1024 ký tự."
        ),
    });

    const FormSchemaAddHdsd = yup.object().shape({
      tenhdsd: yup
        .string()
        .required("Vui lòng nhập tên hướng dẫn sử dụng.")
        .min(8, "Tên hướng dẫn sử dụng phải có ít nhất 8 ký tự.")
        .max(255, "Tên hướng dẫn sử dụng không vượt quá 255 ký tự.")
        .matches(
          /^[a-zA-Z0-9\sÀÁÃẢẠÂẦẤẨẪẬĂẮẰẲẴẶÈÉẼẺẸẾÊỀỂỄỆỈÍÌỊĨỌỎÒÓÕÔỒỔỖỐỘỚỜỞỠỢƠƯỨỪỬỮỰÙÚỤỦŨÝỶỸỴỲỳýỵỷỹđĐàáãạảâầấẩẫậăắằẳẵặẽẻẹèéêềếệểễìíịỉĩòóỏõọôồốổỗộơởờớỡợùúụủũưứừửữựỳýỵỷỹ\s]*$/,
          "Tên hướng dẫn sử dụng không được có ký tự đặc biệt."
        )
        .test(
          "unique",
          "Tên hướng dẫn sử dụng đã tồn tại.",
          async function (value) {
            if (value) {
              const isUnique = await accountService.kiemTraTonTaiHDSD(
                value,
                this.optionDvs,
                this.optionPh,
                this.optionCn,
                this.optionLoai
              );
              return !isUnique;
            }
            return true;
          }.bind(this)
        ),
    });

    const FormSchemaSuaHdsd = yup.object().shape({
      tenhdsdm: yup
        .string()
        .required("Vui lòng nhập tên hướng dẫn sử dụng mới.")
        .min(8, "Tên hướng dẫn sử dụng mới phải có ít nhất 8 ký tự.")
        .max(255, "Tên hướng dẫn sử dụng mới không vượt quá 255 ký tự.")
        .matches(
          /^[a-zA-Z0-9\sÀÁÃẢẠÂẦẤẨẪẬĂẮẰẲẴẶÈÉẼẺẸẾÊỀỂỄỆỈÍÌỊĨỌỎÒÓÕÔỒỔỖỐỘỚỜỞỠỢƠƯỨỪỬỮỰÙÚỤỦŨÝỶỸỴỲỳýỵỷỹđĐàáãạảâầấẩẫậăắằẳẵặẽẻẹèéêềếệểễìíịỉĩòóỏõọôồốổỗộơởờớỡợùúụủũưứừửữựỳýỵỷỹ\s]*$/,
          "Tên hướng dẫn sử dụng mới không được có ký tự đặc biệt."
        )
        .test(
          "unique",
          "Tên hướng dẫn sử dụng mới đã tồn tại.",
          async function (value) {
            if (
              value &&
              value !==
              this.optionsHdsd.find(
                (element) => element.MAHDSD === this.optionHdsd
              ).TIEUDEHDSD
            ) {
              const isUnique = await accountService.kiemTraTonTaiHDSD(
                value,
                this.optionDvs,
                this.optionPh,
                this.optionCn,
                this.optionLoai
              );
              return !isUnique;
            }
            return true;
          }.bind(this)
        ),
    });

    const FormSchemaAddPbHdsd = yup.object().shape({
      tieudepb: yup
        .string()
        .required("Vui lòng nhập tiêu đề phiên bản hướng dẫn sử dụng.")
        .min(8, "Tiêu đề phiên bản hướng dẫn sử dụng phải có ít nhất 8 ký tự.")
        .max(
          255,
          "Tiêu đề phiên bản hướng dẫn sử dụng không vượt quá 255 ký tự."
        )
        .matches(
          /^[a-zA-Z0-9\sÀÁÃẢẠÂẦẤẨẪẬĂẮẰẲẴẶÈÉẼẺẸẾÊỀỂỄỆỈÍÌỊĨỌỎÒÓÕÔỒỔỖỐỘỚỜỞỠỢƠƯỨỪỬỮỰÙÚỤỦŨÝỶỸỴỲỳýỵỷỹđĐàáãạảâầấẩẫậăắằẳẵặẽẻẹèéêềếệểễìíịỉĩòóỏõọôồốổỗộơởờớỡợùúụủũưứừửữựỳýỵỷỹ\s.]*$/,
          "Tiêu đề phiên bản hướng dẫn sử dụng không được có ký tự đặc biệt."
        )
        .test(
          "unique",
          "Tiêu đề phiên bản hướng dẫn sử dụng đã tồn tại.",
          async function (value) {
            if (value) {
              const isUnique = await accountService.kiemTraTonTaiPbHDSD(
                value,
                this.optionHdsd
              );
              return !isUnique;
            }
            return true;
          }.bind(this)
        ),

      motapbhdsd: yup
        .string()
        .required("Vui lòng nhập mô tả phiên bản hướng dẫn sử dụng.")
        .min(8, "Mô tả phiên bản hướng dẫn sử dụng phải có ít nhất 8 ký tự.")
        .max(
          1024,
          "Mô tả phiên bản hướng dẫn sử dụng không vượt quá 1024 ký tự."
        ),
    });

    const FormSchemaSuaPbHdsd = yup.object().shape({
      tieudepbm: yup
        .string()
        .required("Vui lòng nhập tiêu đề phiên bản hướng dẫn sử dụng mới.")
        .min(
          8,
          "Tiêu đề phiên bản hướng dẫn sử dụng mới phải có ít nhất 8 ký tự."
        )
        .max(
          255,
          "Tiêu đề phiên bản hướng dẫn sử dụng mới không vượt quá 255 ký tự."
        )
        .matches(
          /^[a-zA-Z0-9\sÀÁÃẢẠÂẦẤẨẪẬĂẮẰẲẴẶÈÉẼẺẸẾÊỀỂỄỆỈÍÌỊĨỌỎÒÓÕÔỒỔỖỐỘỚỜỞỠỢƠƯỨỪỬỮỰÙÚỤỦŨÝỶỸỴỲỳýỵỷỹđĐàáãạảâầấẩẫậăắằẳẵặẽẻẹèéêềếệểễìíịỉĩòóỏõọôồốổỗộơởờớỡợùúụủũưứừửữựỳýỵỷỹ\s.]*$/,
          "Tiêu đề phiên bản hướng dẫn sử dụng mới không được có ký tự đặc biệt."
        )
        .test(
          "unique",
          "Tiêu đề phiên bản hướng dẫn sử dụng đã tồn tại.",
          async function (value) {
            if (
              value &&
              value !==
              this.optionsPbHdsd.find(
                (element) => element.MAPHIENBAN === this.optionPbHdsd
              ).TIEUDEPHIENBAN
            ) {
              const isUnique = await accountService.kiemTraTonTaiPbHDSD(
                value,
                this.optionHdsd
              );
              return !isUnique;
            }
            return true;
          }.bind(this)
        ),
      motapbhdsdm: yup
        .string()
        .required("Vui lòng nhập mô tả phiên bản hướng dẫn sử dụng mới.")
        .min(
          8,
          "Mô tả phiên bản hướng dẫn sử dụng mới phải có ít nhất 8 ký tự."
        )
        .max(
          1024,
          "Mô tả phiên bản hướng dẫn sử dụng mới không vượt quá 1024 ký tự."
        ),
    });

    return {
      tendvs: "",
      tendvsmoi: "",
      tenph: "",
      tencn: "",
      tencnmoi: "",
      tentieude: "",
      tenhdsd: "",
      tenhdsdm: "",
      tentieudem: "",
      motahdsd: "",
      motahdsdcm: "",
      motapbhdsd: "",
      tieudepb: "",
      FormSchemaAddDvs,
      FormSchemaAddPh,
      FormSchemaAddCn,
      FormSchemaUpdateDvs,
      FormSchemaUpdatePh,
      FormSchemaUpdateCn,
      FormSchemaAddHdsdc,
      FormSchemaAddHdsd,
      FormSchemaSuaHdsd,
      FormSchemaSuaHdsdc,
      FormSchemaAddPbHdsd,
      FormSchemaSuaPbHdsd,
      // dvsItems: [],
      account: {},
      accountInfo: {},
      optionsDvs: [],
      optionDvs: -1,
      optionsPh: [],
      optionPh: -1,
      optionsCn: [],
      optionCn: -1,
      optionsHdsdc: [],
      optionHdsdc: -1,
      optionsLoai: [],
      optionLoai: -1,
      optionsHdsd: [],
      optionHdsd: -1,
      optionsPbHdsd: [],
      optionPbHdsd: -1,
      selectedOption: "dvs",
      dvsVisible: true,
      phVisible: false,
      selectedOptionSua: "sdvs",
      sdvsVisible: true,
      sphVisible: false,
      selectedOptionHDSDChung: "hdsdc",
      hdsdcVisible: true,
      shdsdcVisible: false,
      addVisible: false,
      addCnVisible: false,
      suaCnVisible: false,
      addHdsdVisible: false,
      suaHdsdVisible: false,
      addPbHdsdVisible: false,
      suaPbHdsdVisible: false,
      addHdsdcVisible: false,
      revertVisible: false,
      revertHdsdVisible: false,
      editVisible: false,
      homeVisible: true,
      isAdmin: false,
      dvsItemsVisible: true,
      dvsItemVisible: false,
      phItemVisible: false,
      cnItemVisible: false,
      lItemVisible: false,
      hdsdItemVisible: false,
      pbhdsdItemVisible: false,
      hdsdcItemVisible: false,
      pbhdsdcItemVisible: false,
      fileName: "",
      fileNameMoi: "",
      file: null,
      viewVisible: false,
      historyHDSDChung: [],
      maLoai: 1,
      showDivSearch: false,
      dsSearch: [],
      inputSearch: "",
      likeDvs: false,
      likePh: false,
      likeCn: false,
      likeLoai: false,
      likeHdsd: false,
      likePbHdsd: false,
      likeHdsdc: false,
      likePbHdsdc: false,
      serverUrl: "http://localhost:8080/images/",
      comment: "",
      dsBinhLuanDvs: [],
      dsBinhLuanHdsdc: [],
      dsBinhLuanPbHdsdc: [],
      dsBinhLuanPh: [],
      dsBinhLuanCn: [],
      dsBinhLuanHdsd: [],
      dsBinhLuanPbHdsd: [],
      binhLuanVisible: true,
      itemReplyBinhLuan: {},
    };
  },
  methods: {
    checkAuthentication() {
      if (!this.account.token) {
        // this.$router.push("/");
      } else {
        return accountService
          .kiemTraDangNhap(this.account.token)
          .then((response) => {
            if (response.statusCode == 200) {
              return accountService
                .layThongTinNguoiDung(
                  this.account.MaNguoiDung,
                  this.account.token
                )
                .then((response) => {
                  this.accountInfo = response;
                })
                .catch((error) => {
                  console.log(error);
                  this.onLogout();
                });
            } else if (response.status === 401) {
              console.error("Authentication failed");
            }
          })
          .catch((error) => {
            console.error(error);
            this.onLogout();
          });
      }
    },
    MessageAddDvs: function () {
      Swal.fire({
        position: "center",
        title: "Đã thêm dịch vụ số thành công!",
        icon: "success",
        confirmButtonColor: "#0c62b5",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    MessageAddPh: function () {
      Swal.fire({
        position: "center",
        title: "Đã thêm phân hệ chức năng thành công!",
        icon: "success",
        confirmButtonColor: "#0c62b5",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    MessageAddCn: function () {
      Swal.fire({
        position: "center",
        title: "Đã thêm chức năng thành công!",
        icon: "success",
        showConfirmButton: true,
        confirmButtonColor: "#0c62b5",
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    MessageUpdateDvs: function () {
      Swal.fire({
        position: "center",
        title: "Đã sửa dịch vụ số thành công!",
        icon: "success",
        confirmButtonColor: "#0c62b5",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    MessageUpdatePh: function () {
      Swal.fire({
        position: "center",
        title: "Đã sửa phân hệ chức năng thành công!",
        icon: "success",
        confirmButtonColor: "#0c62b5",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    MessageUpdateCn: function () {
      Swal.fire({
        position: "center",
        title: "Đã sửa chức năng thành công!",
        icon: "success",
        confirmButtonColor: "#0c62b5",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    MessageNotChoiceDvs: function () {
      Swal.fire({
        position: "center",
        title: "Vui lòng chọn dịch vụ số!",
        icon: "error",
        confirmButtonColor: "#0c62b5",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    MessageNotChoicePh: function () {
      Swal.fire({
        position: "center",
        title: "Vui lòng chọn phân hệ chức năng!",
        icon: "error",
        confirmButtonColor: "#0c62b5",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    MessageNotChoiceCn: function () {
      Swal.fire({
        position: "center",
        title: "Vui lòng chọn chức năng!",
        icon: "error",
        confirmButtonColor: "#0c62b5",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    MessageNotChoiceLoai: function () {
      Swal.fire({
        position: "center",
        title: "Vui lòng chọn loại!",
        icon: "error",
        confirmButtonColor: "#0c62b5",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    MessageNotChoicePBHDSDChung: function () {
      Swal.fire({
        position: "center",
        title: "Vui lòng chọn phiên bản!",
        icon: "error",
        confirmButtonColor: "#0c62b5",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    MessageNotChoiceHDSD: function () {
      Swal.fire({
        position: "center",
        title: "Vui lòng chọn hướng dẫn sử dụng!",
        icon: "error",
        confirmButtonColor: "#0c62b5",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    MessageNotChoicePbHDSD: function () {
      Swal.fire({
        position: "center",
        title: "Vui lòng chọn phiên bản hướng dẫn sử dụng!",
        icon: "error",
        confirmButtonColor: "#0c62b5",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    onLogout() {
      localStorage.removeItem("account");
      location.reload();
    },
    showViewFile() {
      this.viewVisible = true;
      this.homeVisible = false;
    },
    showFormAdd() {
      this.addVisible = true;
      this.editVisible = false;
      this.addCnVisible = false;
      this.suaCnVisible = false;
      this.addHdsdcVisible = false;
      this.homeVisible = false;
      this.addHdsdVisible = false;
      this.suaHdsdVisible = false;
      this.addPbHdsdVisible = false;
      this.revertVisible = false;
      this.revertHdsdVisible = false;
      this.suaPbHdsdVisible = false;
      if (this.phItem.id && !this.cnItem.id) {
        this.selectedOption = "phcn";
      }
    },
    showFormAddCn() {
      this.addCnVisible = true;
      this.suaCnVisible = false;
      this.addVisible = false;
      this.editVisible = false;
      this.homeVisible = false;
      this.addHdsdVisible = false;
      this.suaHdsdVisible = false;
      this.addHdsdcVisible = false;
      this.addPbHdsdVisible = false;
      this.revertVisible = false;
      this.revertHdsdVisible = false;
      this.suaPbHdsdVisible = false;
    },
    showFormSuaCn() {
      this.addCnVisible = false;
      this.suaCnVisible = true;
      this.addVisible = false;
      this.editVisible = false;
      this.homeVisible = false;
      this.addHdsdcVisible = false;
      this.addHdsdVisible = false;
      this.addPbHdsdVisible = false;
      this.suaHdsdVisible = false;
      this.revertVisible = false;
      this.revertHdsdVisible = false;
      this.suaPbHdsdVisible = false;
    },
    showFormAddHdsdChung() {
      this.addVisible = false;
      this.addCnVisible = false;
      this.suaCnVisible = false;
      this.editVisible = false;
      this.addHdsdcVisible = true;
      this.addHdsdVisible = false;
      this.addPbHdsdVisible = false;
      this.suaHdsdVisible = false;
      this.revertVisible = false;
      this.revertHdsdVisible = false;
      this.homeVisible = false;
      this.suaPbHdsdVisible = false;
      if (this.hdsdcItem.id) {
        this.selectedOptionHDSDChung = "hdsdc";
      }
    },
    showFormAddHdsd() {
      this.addVisible = false;
      this.editVisible = false;
      this.addHdsdcVisible = false;
      this.addHdsdVisible = true;
      this.suaCnVisible = false;
      this.suaHdsdVisible = false;
      this.addPbHdsdVisible = false;
      this.revertVisible = false;
      this.revertHdsdVisible = false;
      this.homeVisible = false;
      this.addCnVisible = false;
      this.suaPbHdsdVisible = false;
    },
    showFormSuaHdsd() {
      this.addVisible = false;
      this.editVisible = false;
      this.addHdsdcVisible = false;
      this.addHdsdVisible = false;
      this.suaHdsdVisible = true;
      this.suaCnVisible = false;
      this.addPbHdsdVisible = false;
      this.revertVisible = false;
      this.revertHdsdVisible = false;
      this.homeVisible = false;
      this.addCnVisible = false;
      this.suaPbHdsdVisible = false;
    },
    showFormAddPbHdsd() {
      this.addVisible = false;
      this.editVisible = false;
      this.addHdsdcVisible = false;
      this.addHdsdVisible = false;
      this.suaHdsdVisible = false;
      this.addPbHdsdVisible = true;
      this.revertVisible = false;
      this.revertHdsdVisible = false;
      this.homeVisible = false;
      this.addCnVisible = false;
      this.suaCnVisible = false;
      this.suaPbHdsdVisible = false;
    },
    async showFormRevert() {
      this.addVisible = false;
      this.editVisible = false;
      this.addHdsdcVisible = false;
      this.addHdsdVisible = false;
      this.addPbHdsdVisible = false;
      this.revertVisible = true;
      this.revertHdsdVisible = false;
      this.suaHdsdVisible = false;
      this.addCnVisible = false;
      this.homeVisible = false;
      this.suaCnVisible = false;
      this.suaPbHdsdVisible = false;
      this.historyHDSDChung = await accountService.layLichSuSuaHDSDChung(
        this.optionDvs,
        this.optionHdsdc
      );
      if (this.hdsdcItem.id && !this.hdsdItem.id) {
        this.selectedOptionHDSDChung = "hdsdc";
      }
    },
    async showFormRevertHdsd() {
      this.addVisible = false;
      this.editVisible = false;
      this.addHdsdcVisible = false;
      this.addHdsdVisible = false;
      this.addPbHdsdVisible = false;
      this.revertVisible = false;
      this.revertHdsdVisible = true;
      this.suaHdsdVisible = false;
      this.addCnVisible = false;
      this.homeVisible = false;
      this.suaCnVisible = false;
      this.suaPbHdsdVisible = false;
      if (this.hdsdcItem.id) {
        this.historyHDSDChung = await accountService.layLichSuSuaHDSDChung(
          this.optionDvs,
          this.optionHdsdc
        );
      } else {
        this.historyHDSDChung = await accountService.layLichSuSuaHDSD(
          this.optionHdsd,
          this.optionPbHdsd
        );
      }
      if (this.hdsdcItem.id && !this.hdsdItem.id) {
        this.selectedOptionHDSDChung = "hdsdc";
      }
    },
    showFormEdit() {
      this.editVisible = true;
      this.addVisible = false;
      this.homeVisible = false;
      this.addHdsdVisible = false;
      this.addHdsdcVisible = false;
      this.suaHdsdVisible = false;
      this.addPbHdsdVisible = false;
      this.revertVisible = false;
      this.revertHdsdVisible = false;
      this.addCnVisible = false;
      this.suaCnVisible = false;
      this.suaPbHdsdVisible = false;
      if (this.phItem.id && !this.cnItem.id) {
        this.selectedOptionSua = "sphcn";
      }
    },
    showFormEditHdsdChung() {
      this.addVisible = false;
      this.addHdsdcVisible = true;
      this.addHdsdVisible = false;
      this.revertVisible = false;
      this.revertHdsdVisible = false;
      this.addPbHdsdVisible = false;
      this.editVisible = false;
      this.homeVisible = false;
      this.suaHdsdVisible = false;
      this.addCnVisible = false;
      this.suaCnVisible = false;
      this.suaPbHdsdVisible = false;
      if (this.hdsdcItem.id) {
        this.selectedOptionHDSDChung = "shdsdc";
      }
    },
    showFormEditPbHdsd() {
      this.addVisible = false;
      this.addHdsdcVisible = false;
      this.addHdsdVisible = false;
      this.revertVisible = false;
      this.revertHdsdVisible = false;
      this.addPbHdsdVisible = false;
      this.suaPbHdsdVisible = true;
      this.editVisible = false;
      this.homeVisible = false;
      this.suaCnVisible = false;
      this.addCnVisible = false;
      this.suaHdsdVisible = false;
    },
    showFormHome() {
      this.homeVisible = true;
      this.editVisible = false;
      this.suaPbHdsdVisible = false;
      this.addVisible = false;
      this.addHdsdcVisible = false;
      this.addHdsdVisible = false;
      this.revertVisible = false;
      this.revertHdsdVisible = false;
      this.addPbHdsdVisible = false;
      this.viewVisible = false;
      this.suaHdsdVisible = false;
      this.addCnVisible = false;
      this.suaCnVisible = false;
      this.selectedOption = "dvs";
      this.selectedOptionHDSDChung = "hdsdc";
      this.selectedOptionSua = "sdvs";
    },
    visibleDvs(item) {
      this.$emit("dvsItem", item);
      this.dvsItemVisible = true;
    },
    visibleHdsdc(item) {
      this.$emit("hdsdcItem", item);
      this.hdsdcItemVisible = true;
      this.dvsItemVisible = false;
    },
    visiblePbHdsdc(item) {
      this.$emit("pbhdsdcItem", item);
      this.pbhdsdcItemVisible = true;
      this.hdsdcItemVisible = false;
    },
    visiblePh(item) {
      this.$emit("phItem", item);
      this.phItemVisible = true;
      this.dvsItemVisible = false;
    },
    visibleCn(item) {
      this.$emit("cnItem", item);
      this.$emit("lItem", item.LoaiItems[0]);
      this.cnItemVisible = true;
      this.phItemVisible = false;
    },
    visibleLoai(item) {
      this.$emit("lItem", item);
      // this.lItemVisible = true;
      // this.cnItemVisible = false;
    },
    visibleHdsd(itemHdsd) {
      this.$emit("hdsdItem", itemHdsd);
      this.hdsdItemVisible = true;
      // this.lItemVisible = false;
      this.cnItemVisible = false;
    },
    visiblePbHdsd(item) {
      this.$emit("pbhdsdItem", item);
      this.pbhdsdItemVisible = true;
      this.hdsdItemVisible = false;
    },
    Empty: function () {
      Swal.fire({
        position: "center",
        title: "Vui lòng nhập mật đầy đủ thông tin!",
        icon: "error",
        confirmButtonColor: "#0c62b5",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    onThemDichVuSo() {
      try {
        this.$refs.formAddDvs.validate().then(async (result) => {
          const errors = result.errors;
          if (Object.keys(errors).length > 0) {
            console.log(errors);
          } else {
            this.LoadingMessage();
            await accountService
              .themDichVuSo(this.tendvs)
              .then(async (response) => {
                if (response.statusCode == 200) {
                  this.MessageAddDvs();
                  const dvsItems = await accountService.layDanhSachMenu(
                    this.accountInfo.Quyen
                  );
                  this.$emit("dvsItems", dvsItems);
                  this.optionsDvs = await accountService.layDichVuSo();
                  this.tendvs = "";
                } else {
                  this.ServerError();
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      } catch (error) {
        console.log(error);
        this.Empty();
      }
    },
    onThemPhanHeChucNang() {
      try {
        this.$refs.formAddPh.validate().then(async (result) => {
          const errors = result.errors;
          if (Object.keys(errors).length > 0) {
            console.log(errors);
          } else {
            this.LoadingMessage();
            await accountService
              .themPhanHeChucNang(this.tenph)
              .then(async (response) => {
                if (response.statusCode == 200) {
                  this.MessageAddPh();
                  this.optionsPh = await accountService.layPhanHeChucNang();
                  this.tenph = "";
                } else {
                  this.ServerError();
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      } catch (error) {
        console.log(error);
        this.Empty();
      }
    },
    onThemChucNang(optionDvs, optionPh) {
      if (optionDvs === -1) {
        this.MessageNotChoiceDvs();
      } else if (optionPh === -1) {
        this.MessageNotChoicePh();
      } else {
        this.$refs.formAddCn.validate().then(async (result) => {
          const errors = result.errors;
          if (Object.keys(errors).length > 0) {
            console.log(errors);
          } else {
            this.LoadingMessage();
            const thongTinThem = {};
            thongTinThem.MaDV = optionDvs;
            thongTinThem.MaPHCN = optionPh;
            thongTinThem.TenChucNang = this.tencn;
            await accountService
              .themChucNang(thongTinThem)
              .then(async (response) => {
                if (response.statusCode == 200) {
                  this.MessageAddCn();
                  const dvsItems = await accountService.layDanhSachMenu(
                    this.accountInfo.Quyen
                  );
                  this.$emit("dvsItems", dvsItems);
                  this.tencn = "";
                } else {
                  this.ServerError();
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      }
    },
    async loadChucNang() {
      this.optionDvs = this.optionsCn.find(
        (element) => element.MACHUCNANG === this.optionCn
      ).MADV;
      this.optionPh = this.optionsCn.find(
        (element) => element.MACHUCNANG === this.optionCn
      ).MAPHCN;
      this.tencnmoi = this.optionsCn.find(
        (element) => element.MACHUCNANG === this.optionCn
      ).TENCHUCNANG;
    },
    async loadChucNangHDSD() {
      this.optionsCn = await accountService.layChucNangTheoDichVuSo(
        this.optionDvs
      );
      this.optionCn = this.optionsCn.find(
        (element) => element.MADV === this.optionDvs
      ).MACHUCNANG;
    },
    async loadHDSDChung() {
      this.optionsHdsdc = await accountService.layPhienBanHDSDChung(
        this.optionDvs
      );
      this.optionHdsdc = -1;
      this.tentieudem = this.optionsHdsdc.find(
        (element) => element.MAPHIENBAN === this.optionHdsdc
      ).TIEUDEPHIENBAN;
    },
    async loadPbHDSDChung() {
      this.tentieudem = this.optionsHdsdc.find(
        (element) => element.MAPHIENBAN === this.optionHdsdc
      ).TIEUDEPHIENBAN;
      this.fileNameMoi = this.optionsHdsdc.find(
        (element) => element.MAPHIENBAN === this.optionHdsdc
      ).DUONGDANFILE;
      this.historyHDSDChung = await accountService.layLichSuSuaHDSDChung(
        this.optionDvs,
        this.optionHdsdc
      );
    },
    async loadHDSD() {
      this.tenhdsdm = this.optionsHdsd.find(
        (element) => element.MAHDSD === this.optionHdsd
      ).TIEUDEHDSD;
      this.optionDvs = this.optionsHdsd.find(
        (element) => element.MAHDSD === this.optionHdsd
      ).MADV_1;
      this.optionCn = this.optionsHdsd.find(
        (element) => element.MAHDSD === this.optionHdsd
      ).MACHUCNANG;
      this.optionLoai = this.optionsHdsd.find(
        (element) => element.MAHDSD === this.optionHdsd
      ).MALOAI;
    },
    async loadDvsSuaPbHDSD() {
      this.optionCn = -1;
      this.optionHdsd = -1;
      this.optionLoai = -1;
      this.optionsHdsd = [];
      this.optionsCn = await accountService.layChucNangTheoDichVuSo(
        this.optionDvs
      );
    },
    async loadCnSuaPbHDSD() {
      this.optionHdsd = -1;
      this.optionsHdsd = await accountService.layHDSDTheoChucNang(
        this.optionCn,
        this.optionLoai
      );
    },
    async loadLoaiSuaPbHDSD() {
      this.optionHdsd = -1;
      this.optionsHdsd = await accountService.layHDSDTheoChucNang(
        this.optionCn,
        this.optionLoai
      );
    },
    async loadHDSDSuaPbHDSD() {
      this.optionPbHdsd = -1;
      this.optionsPbHdsd = await accountService.layPbHDSD(this.optionHdsd);
      this.optionLoai = this.optionsHdsd.find(
        (element) => element.MAHDSD === this.optionHdsd
      ).MALOAI;
      this.optionCn = this.optionsHdsd.find(
        (element) => element.MAHDSD === this.optionHdsd
      ).MACHUCNANG;
      this.optionDvs = this.optionsHdsd.find(
        (element) => element.MAHDSD === this.optionHdsd
      ).MADV_1;
    },
    loadPbHdsdSuaPbHDSD() {
      this.tieudepbm = this.optionsPbHdsd.find(
        (element) => element.MAPHIENBAN === this.optionPbHdsd
      ).TIEUDEPHIENBAN;
    },
    async onSuaDichVuSo() {
      if (this.optionDvs === -1) {
        this.MessageNotChoiceDvs();
      } else {
        this.$refs.formUpdateDvs.validate().then(async (result) => {
          const errors = result.errors;
          if (Object.keys(errors).length > 0) {
            console.log(errors);
          } else {
            this.LoadingMessage();
            const thongTinSua = {};
            thongTinSua.MaDV = this.optionDvs;
            thongTinSua.TenDV = this.tendvsmoi;
            await accountService
              .suaDichVuSo(thongTinSua)
              .then(async (response) => {
                if (response.statusCode == 200) {
                  this.MessageUpdateDvs();
                  const dvsItems = await accountService.layDanhSachMenu(
                    this.accountInfo.Quyen
                  );
                  this.$emit("dvsItems", dvsItems);
                  this.optionsDvs = await accountService.layDichVuSo();
                } else {
                  this.ServerError();
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      }
    },
    async onSuaPhanHeChucNang() {
      if (this.optionPh === -1) {
        this.MessageNotChoicePh();
      } else {
        this.$refs.formUpdatePh.validate().then(async (result) => {
          const errors = result.errors;
          if (Object.keys(errors).length > 0) {
            console.log(errors);
          } else {
            this.LoadingMessage();
            const thongTinSua = {};
            thongTinSua.MaPHCN = this.optionPh;
            thongTinSua.TenPHCN = this.tenphmoi;
            await accountService
              .suaPhanHeChucNang(thongTinSua)
              .then(async (response) => {
                if (response.statusCode == 200) {
                  this.MessageUpdatePh();
                  const dvsItems = await accountService.layDanhSachMenu(
                    this.accountInfo.Quyen
                  );
                  this.$emit("dvsItems", dvsItems);
                  this.optionsDvs = await accountService.layDichVuSo();
                  this.optionsPh = await accountService.layPhanHeChucNang();
                } else {
                  this.ServerError();
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      }
    },
    async onSuaChucNang() {
      if (this.optionDvs === -1) {
        this.MessageNotChoiceDvs();
      } else if (this.optionPh === -1) {
        this.MessageNotChoicePh();
      } else if (this.optionCn === -1) {
        this.MessageNotChoiceCn();
      } else {
        this.$refs.formUpdateCn.validate().then(async (result) => {
          const errors = result.errors;
          if (Object.keys(errors).length > 0) {
            console.log(errors);
          } else {
            this.LoadingMessage();
            const thongTinSua = {};
            thongTinSua.MaChucNang = this.optionCn;
            thongTinSua.TenChucNang = this.tencnmoi;
            thongTinSua.MaDV = this.optionDvs;
            thongTinSua.MaPHCN = this.optionPh;
            await accountService
              .suaChucNang(thongTinSua)
              .then(async (response) => {
                if (response.statusCode == 200) {
                  this.MessageUpdateCn();
                  const dvsItems = await accountService.layDanhSachMenu(
                    this.accountInfo.Quyen
                  );
                  this.$emit("dvsItems", dvsItems);
                  this.optionsDvs = await accountService.layDichVuSo();
                  this.optionsPh = await accountService.layPhanHeChucNang();
                  this.optionsCn = await accountService.layChucNang();
                } else {
                  this.ServerError();
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      }
    },
    truncateText(text, length) {
      if (text.length > length) {
        return text.slice(0, length) + "...";
      }
      return text;
    },
    openFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      this.file = event.target.files[0]; // Lấy tệp đã chọn
      if (this.file) {
        this.fileName = this.file.name; // Gán tên file vào biến fileName
        this.fileNameMoi = this.file.name;
      } else {
        this.fileName = ""; // Nếu không có tệp, đặt giá trị fileName thành rỗng
        this.fileNameMoi = "";
      }
    },
    getFileIcon(fileName) {
      // Lấy phần mở rộng (extension) của tên file
      const extension = fileName.split(".").pop();

      // Xác định và trả về hình ảnh tương ứng dựa trên phần mở rộng của tên file
      switch (extension) {
        case "docx":
          return "src/icons/doc.png";
        case "doc":
          return "src/icons/doc.png";
        case "pdf":
          return "src/icons/pdf.png";
        case "xlsx":
          return "src/icons/xls.png";
        case "xls":
          return "src/icons/xls.png";
        case "pptx":
          return "src/icons/ppt.png";
        case "ppt":
          return "src/icons/ppt.png";
        case "mp4":
          return "src/icons/video.png";
        case "mov":
          return "src/icons/video.png";
        default:
          return "src/icons/Upload-file.png";
      }
    },
    getPdfUrl(url) {
      const fileExtension = url.split(".").pop().toLowerCase();
      const supportedExtensions = ["doc", "docx", "xls", "xlsx", "ppt", "pptx"];

      if (supportedExtensions.includes(fileExtension)) {
        return "http://localhost:8080/HDSD/" + url.replace(/\.[^/.]+$/, ".pdf");
      }

      return "http://localhost:8080/HDSD/" + url;
    },
    EmptyFile: function () {
      Swal.fire({
        position: "center",
        title: "Vui lòng chọn file hướng dẫn sử dụng!",
        icon: "error",
        confirmButtonColor: "#0c62b5",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    AllowFile: function () {
      Swal.fire({
        position: "center",
        title:
          "Các loại file được cho phép  word, excel, powerpoint, pdf, mp4!",
        icon: "error",
        confirmButtonColor: "#0c62b5",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    AddHDSDChung: function () {
      Swal.fire({
        position: "center",
        title: "Đã thêm hướng dẫn sử dụng chung thành công!",
        icon: "success",
        confirmButtonColor: "#0c62b5",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    AddHDSD: function () {
      Swal.fire({
        position: "center",
        title: "Đã thêm hướng dẫn sử dụng thành công!",
        icon: "success",
        confirmButtonColor: "#0c62b5",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    EditHDSDChung: function () {
      Swal.fire({
        position: "center",
        title: "Đã sửa hướng dẫn sử dụng chung thành công!",
        icon: "success",
        confirmButtonColor: "#0c62b5",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    EditHDSD: function () {
      Swal.fire({
        position: "center",
        title: "Đã sửa hướng dẫn sử dụng thành công!",
        icon: "success",
        confirmButtonColor: "#0c62b5",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    AddPbHDSD: function () {
      Swal.fire({
        position: "center",
        title: "Đã thêm phiên bản hướng dẫn sử dụng thành công!",
        icon: "success",
        confirmButtonColor: "#0c62b5",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    EditPbHDSD: function () {
      Swal.fire({
        position: "center",
        title: "Đã sửa phiên bản hướng dẫn sử dụng thành công!",
        icon: "success",
        confirmButtonColor: "#0c62b5",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    ServerError: function () {
      Swal.fire({
        position: "center",
        title: "Máy chủ đang lỗi vui lòng thử lại sau!",
        icon: "error",
        confirmButtonColor: "#0c62b5",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    LoadingMessage: function () {
      Swal.fire({
        title:
          "<div class='swal-loading-spinner'></div><div>Đang xử lý...</div>",
        icon: "info",
        showConfirmButton: false,
        allowOutsideClick: false,
        width: 500,
        customClass: {
          popup: "swal-loading-popup",
          content: "swal-loading-content",
        },
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
    },
    onThemHDSDChung() {
      if (this.optionDvs === -1) {
        this.MessageNotChoiceDvs();
      } else if (this.file === null) {
        this.EmptyFile();
      } else {
        this.$refs.formAddHdsdc.validate().then(async (result) => {
          const errors = result.errors;
          if (Object.keys(errors).length > 0) {
            console.log(errors);
          } else {
            const allowedExtensions = [
              "doc",
              "docx",
              "xls",
              "xlsx",
              "ppt",
              "pptx",
              "pdf",
              "mp4",
            ];
            const fileExtension = this.file.name.split(".").pop().toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
              this.AllowFile();
              return;
            } else {
              const formData = new FormData();
              formData.append("HDSD", this.file);
              const results = fileService.uploadHDSD(formData);
              // Show loading message
              this.LoadingMessage();
              results
                .then(async (response) => {
                  if (response.statusCode == 200) {
                    const thongTinThem = {};
                    thongTinThem.TieuDePhienBan = this.tentieude;
                    thongTinThem.MoTa = this.motahdsd;
                    thongTinThem.DuongDanFile = response.hdsdUrl;
                    thongTinThem.MaDV = this.optionDvs;
                    thongTinThem.MaNguoiDung = this.account.MaNguoiDung;
                    await accountService.themHuongDanSuDungChung(thongTinThem);
                    const dvsItems = await accountService.layDanhSachMenu(
                      this.accountInfo.Quyen
                    );
                    this.$emit("dvsItems", dvsItems);
                    this.AddHDSDChung();
                    this.tentieude = "";
                    this.motahdsd = "";
                    this.file = null;
                    this.fileName = "";
                  } else {
                    this.ServerError();
                  }
                })
                .catch((error) => {
                  console.log(error);
                  this.ServerError();
                });
            }
          }
        });
      }
    },
    onSuaHDSDChung() {
      if (this.optionDvs === -1) {
        this.MessageNotChoiceDvs();
      } else if (this.optionHdsdc === -1) {
        this.MessageNotChoicePBHDSDChung();
      } else if (this.file === null) {
        this.$refs.formUpdateHdsdc.validate().then(async (result) => {
          const errors = result.errors;
          if (Object.keys(errors).length > 0) {
            console.log(errors);
          } else {
            this.LoadingMessage();
            const thongTinSua = {};
            thongTinSua.MaPhienBan = this.optionHdsdc;
            thongTinSua.TieuDePhienBan = this.tentieudem;
            thongTinSua.MoTa = this.motahdsdcm;
            thongTinSua.DuongDanFile = this.fileNameMoi;
            thongTinSua.MaDV = this.optionDvs;
            thongTinSua.MaNguoiDung = this.account.MaNguoiDung;
            await accountService.suaHuongDanSuDungChung(thongTinSua);
            // cập nhật lại cái cây
            const dvsItems = await accountService.layDanhSachMenu(
              this.accountInfo.Quyen
            );
            this.$emit("dvsItems", dvsItems);
            this.EditHDSDChung();
            this.motahdsdcm = "";
            this.file = null;
            this.optionsHdsdc = await accountService.layPhienBanHDSDChung(
              this.optionDvs
            );
          }
        });
      } else {
        this.$refs.formUpdateHdsdc.validate().then(async (result) => {
          const errors = result.errors;
          if (Object.keys(errors).length > 0) {
            console.log(errors);
          } else {
            const allowedExtensions = [
              "doc",
              "docx",
              "xls",
              "xlsx",
              "ppt",
              "pptx",
              "pdf",
              "mp4",
            ];
            const fileExtension = this.file.name.split(".").pop().toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
              this.AllowFile();
              return;
            } else {
              const formData = new FormData();
              formData.append("HDSD", this.file);
              const results = fileService.uploadHDSD(formData);
              // Show loading message
              this.LoadingMessage();
              results
                .then(async (response) => {
                  if (response.statusCode == 200) {
                    const thongTinSua = {};
                    thongTinSua.MaPhienBan = this.optionHdsdc;
                    thongTinSua.TieuDePhienBan = this.tentieudem;
                    thongTinSua.MoTa = this.motahdsdcm;
                    thongTinSua.DuongDanFile = response.hdsdUrl;
                    thongTinSua.MaDV = this.optionDvs;
                    thongTinSua.MaNguoiDung = this.account.MaNguoiDung;
                    await accountService.suaHuongDanSuDungChung(thongTinSua);
                    // cập nhật lại cái cây
                    const dvsItems = await accountService.layDanhSachMenu(
                      this.accountInfo.Quyen
                    );
                    this.$emit("dvsItems", dvsItems);
                    this.EditHDSDChung();
                    this.motahdsdcm = "";
                    this.file = null;
                  } else {
                    this.ServerError();
                  }
                })
                .catch((error) => {
                  console.log(error);
                  this.ServerError();
                });
            }
          }
        });
      }
    },
    revert(item) {
      Swal.fire({
        title: 'Bạn có chắc muốn khôi phục nội dung "' + item.title + '" ?',
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0c62b5",
        cancelButtonColor: "#d33",
        cancelButtonText: "Không", // Swap the text for the Cancel button
        confirmButtonText: "Có", // Swap the text for the OK button
        customClass: {
          actions: "swal-buttons", // Custom CSS class for the dialog
        },
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const ThongTinKhoiPhuc = {};
          ThongTinKhoiPhuc.MaPhienBan = item.id;
          ThongTinKhoiPhuc.TieuDePhienBan = item.title;
          ThongTinKhoiPhuc.MaDV = this.optionDvs;
          ThongTinKhoiPhuc.ThoiGianTao = item.timeOrigin;
          this.LoadingMessage();
          await accountService
            .khoiPhucHDSDChung(ThongTinKhoiPhuc)
            .then(async (response) => {
              if (response.statusCode == 200) {
                // const dvsItems = await accountService.layDanhSachMenu(
                //   this.accountInfo.Quyen
                // );
                // this.$emit("dvsItems", dvsItems);
                Swal.fire({
                  position: "center",
                  title:
                    'Đã khôi phục phiên bản "' + item.title + '" thành công!',
                  icon: "success",
                  confirmButtonColor: "#0c62b5",
                  showConfirmButton: true,
                  allowOutsideClick: false,
                  timerProgressBar: false,
                  width: 500,
                }).then(async () => {
                  // location.reload(); // Reload lại trang
                  const dvsItems = await accountService.layDanhSachMenu(
                    this.accountInfo.Quyen
                  );
                  this.$emit("dvsItems", dvsItems);
                });
              } else {
                this.ServerError();
              }
            })
            .catch((error) => {
              console.log(error);
              this.ServerError();
            });
        } else {
          // The user clicked "Cancel" or closed the dialog
          // Do nothing or handle the cancel action
        }
      });
    },
    onThemHDSD() {
      if (this.optionDvs === -1) {
        this.MessageNotChoiceDvs();
      } else if (this.optionCn === -1) {
        this.MessageNotChoiceCn();
      } else if (this.optionLoai === -1) {
        this.MessageNotChoiceLoai();
      } else {
        this.$refs.formAddHdsd.validate().then(async (result) => {
          const errors = result.errors;
          if (Object.keys(errors).length > 0) {
            console.log(errors);
          } else {
            this.LoadingMessage();
            const thongTinThem = {};
            thongTinThem.MaChucNang = this.optionCn;
            thongTinThem.MaLoai = this.optionLoai;
            thongTinThem.TieuDeHDSD = this.tenhdsd;
            await accountService
              .themHDSD(thongTinThem)
              .then(async (response) => {
                if (response.statusCode == 200) {
                  const dvsItems = await accountService.layDanhSachMenu(
                    this.accountInfo.Quyen
                  );
                  this.$emit("dvsItems", dvsItems);
                  this.AddHDSD();
                  this.tenhdsd = "";
                } else {
                  this.ServerError();
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      }
    },
    onSuaHDSD() {
      if (this.optionHdsd === -1) {
        this.MessageNotChoiceHDSD();
      } else if (this.optionCn === -1) {
        this.MessageNotChoiceCn();
      } else if (this.optionDvs === -1) {
        this.MessageNotChoiceDvs();
      } else if (this.optionLoai === -1) {
        this.MessageNotChoiceLoai();
      } else {
        this.$refs.formUpdateHdsd.validate().then(async (result) => {
          const errors = result.errors;
          if (Object.keys(errors).length > 0) {
            console.log(errors);
          } else {
            this.LoadingMessage();
            const thongTinSua = {};
            thongTinSua.MaHDSD = this.optionHdsd;
            thongTinSua.MaChucNang = this.optionCn;
            thongTinSua.MaLoai = this.optionLoai;
            thongTinSua.TieuDeHDSD = this.tenhdsdm;
            await accountService
              .suaHDSD(thongTinSua)
              .then(async (response) => {
                if (response.statusCode == 200) {
                  const dvsItems = await accountService.layDanhSachMenu(
                    this.accountInfo.Quyen
                  );
                  this.$emit("dvsItems", dvsItems);
                  this.EditHDSD();
                } else {
                  this.ServerError();
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      }
    },
    onThemPbHDSD() {
      if (this.optionDvs === -1) {
        this.MessageNotChoiceDvs();
      } else if (this.optionCn === -1) {
        this.MessageNotChoiceCn();
      } else if (this.optionLoai === -1) {
        this.MessageNotChoiceLoai();
      } else if (this.optionHdsd === -1) {
        this.MessageNotChoiceHDSD();
      } else if (this.file === null) {
        this.EmptyFile();
      } else {
        this.$refs.formAddPbHdsd.validate().then(async (result) => {
          const errors = result.errors;
          if (Object.keys(errors).length > 0) {
            console.log(errors);
          } else {
            const allowedExtensions = [
              "doc",
              "docx",
              "xls",
              "xlsx",
              "ppt",
              "pptx",
              "pdf",
              "mp4",
            ];
            const fileExtension = this.file.name.split(".").pop().toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
              this.AllowFile();
              return;
            } else {
              const formData = new FormData();
              formData.append("HDSD", this.file);
              const results = fileService.uploadHDSD(formData);
              // Show loading message
              this.LoadingMessage();
              results
                .then(async (response) => {
                  if (response.statusCode == 200) {
                    const thongTinThem = {};
                    thongTinThem.TieuDePhienBan = this.tieudepb;
                    thongTinThem.MoTa = this.motapbhdsd;
                    thongTinThem.DuongDanFile = response.hdsdUrl;
                    thongTinThem.MaHDSD = this.optionHdsd;
                    thongTinThem.MaNguoiDung = this.account.MaNguoiDung;
                    await accountService.themPbHDSD(thongTinThem);
                    const dvsItems = await accountService.layDanhSachMenu(
                      this.accountInfo.Quyen
                    );
                    this.$emit("dvsItems", dvsItems);
                    this.AddPbHDSD();
                    this.tentieude = "";
                    this.motahdsd = "";
                    this.file = null;
                    this.fileName = "";
                  } else {
                    this.ServerError();
                  }
                })
                .catch((error) => {
                  console.log(error);
                  this.ServerError();
                });
            }
          }
        });
      }
    },
    onSuaPbHDSD() {
      if (this.optionDvs === -1) {
        this.MessageNotChoiceDvs();
      } else if (this.optionCn === -1) {
        this.MessageNotChoiceCn();
      } else if (this.optionLoai === -1) {
        this.MessageNotChoiceLoai();
      } else if (this.optionHdsd === -1) {
        this.MessageNotChoiceHDSD();
      } else if (this.optionPbHdsd === -1) {
        this.MessageNotChoicePbHDSD();
      } else if (this.file === null) {
        this.$refs.formUpdatePbHdsd.validate().then(async (result) => {
          const errors = result.errors;
          if (Object.keys(errors).length > 0) {
            console.log(errors);
          } else {
            this.LoadingMessage();
            const thongTinSua = {};
            thongTinSua.MaPhienBan = this.optionPbHdsd;
            thongTinSua.TieuDePhienBan = this.tieudepbm;
            thongTinSua.MoTa = this.motapbhdsdm;
            thongTinSua.DuongDanFile = this.fileNameMoi;
            thongTinSua.MaHDSD = this.optionHdsd;
            thongTinSua.MaNguoiDung = this.account.MaNguoiDung;
            await accountService.suaPbHDSD(thongTinSua);
            // cập nhật lại cái cây
            const dvsItems = await accountService.layDanhSachMenu(
              this.accountInfo.Quyen
            );
            this.$emit("dvsItems", dvsItems);
            this.EditPbHDSD();
            this.motahdsdcm = "";
            this.file = null;
            this.optionsHdsdc = await accountService.layPhienBanHDSDChung(
              this.optionDvs
            );
          }
        });
      } else {
        this.$refs.formUpdatePbHdsd.validate().then(async (result) => {
          const errors = result.errors;
          if (Object.keys(errors).length > 0) {
            console.log(errors);
          } else {
            const allowedExtensions = [
              "doc",
              "docx",
              "xls",
              "xlsx",
              "ppt",
              "pptx",
              "pdf",
              "mp4",
            ];
            const fileExtension = this.file.name.split(".").pop().toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
              this.AllowFile();
              return;
            } else {
              const formData = new FormData();
              formData.append("HDSD", this.file);
              const results = fileService.uploadHDSD(formData);
              // Show loading message
              this.LoadingMessage();
              results
                .then(async (response) => {
                  if (response.statusCode == 200) {
                    const thongTinSua = {};
                    thongTinSua.MaPhienBan = this.optionHdsdc;
                    thongTinSua.TieuDePhienBan = this.tentieudem;
                    thongTinSua.MoTa = this.motahdsdcm;
                    thongTinSua.DuongDanFile = response.hdsdUrl;
                    thongTinSua.MaDV = this.optionDvs;
                    thongTinSua.MaNguoiDung = this.account.MaNguoiDung;
                    await accountService.suaHuongDanSuDungChung(thongTinSua);
                    // cập nhật lại cái cây
                    const dvsItems = await accountService.layDanhSachMenu(
                      this.accountInfo.Quyen
                    );
                    this.$emit("dvsItems", dvsItems);
                    this.EditHDSDChung();
                    this.motahdsdcm = "";
                    this.file = null;
                  } else {
                    this.ServerError();
                  }
                })
                .catch((error) => {
                  console.log(error);
                  this.ServerError();
                });
            }
          }
        });
      }
    },
    revertPbHdsd(item) {
      Swal.fire({
        title: 'Bạn có chắc muốn khôi phục nội dung "' + item.title + '" ?',
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0c62b5",
        cancelButtonColor: "#d33",
        cancelButtonText: "Không", // Swap the text for the Cancel button
        confirmButtonText: "Có", // Swap the text for the OK button
        customClass: {
          actions: "swal-buttons", // Custom CSS class for the dialog
        },
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const ThongTinKhoiPhuc = {};
          ThongTinKhoiPhuc.MaPhienBan = item.id;
          ThongTinKhoiPhuc.TieuDePhienBan = item.title;
          ThongTinKhoiPhuc.MaHDSD = this.optionHdsd;
          ThongTinKhoiPhuc.ThoiGianTao = item.timeOrigin;
          this.LoadingMessage();
          await accountService
            .khoiPhucHDSD(ThongTinKhoiPhuc)
            .then(async (response) => {
              if (response.statusCode == 200) {
                // const dvsItems = await accountService.layDanhSachMenu(
                //   this.accountInfo.Quyen
                // );
                // this.$emit("dvsItems", dvsItems);
                Swal.fire({
                  position: "center",
                  title:
                    'Đã khôi phục phiên bản "' + item.title + '" thành công!',
                  icon: "success",
                  confirmButtonColor: "#0c62b5",
                  showConfirmButton: true,
                  allowOutsideClick: false,
                  timerProgressBar: false,
                  width: 500,
                }).then(() => {
                  location.reload(); // Reload lại trang
                });
              } else {
                this.ServerError();
              }
            })
            .catch((error) => {
              console.log(error);
              this.ServerError();
            });
        } else {
          // The user clicked "Cancel" or closed the dialog
          // Do nothing or handle the cancel action
        }
      });
    },
    share() {
      const params = {
        dvsItem: this.dvsItem,
        phItem: this.phItem,
        cnItem: this.cnItem,
        lItem: this.lItem,
        hdsdcItem: this.hdsdcItem,
        pbhdsdcItem: this.pbhdsdcItem,
        hdsdItem: this.hdsdItem,
        pbhdsdItem: this.pbhdsdItem,
      };
      const queryString = encodeURIComponent(JSON.stringify(params));
      const url =
        "http://localhost:3001" + this.$route.path + "?param=" + queryString;

      Swal.fire({
        title:
          '<span class="icon-container"><i class="fa fa-share-nodes"></i></span> Chia sẻ',
        html: `<span class="icon-container"><i class="fas fa-link"></i></span> <input style="width: 90%; padding: 10px;" type="text" id="link" value="${url}" readonly>`,
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        // confirmButtonColor: "",
        // cancelButtonColor: "#0c62b5",
        // confirmButtonText: '<i class="fas fa-link"></i>',
        // cancelButtonText: '<i class="fa-brands fa-facebook-f"></i>',
        customClass: {
          htmlContainer: "custom-html-container",
          actions: "swal-buttons-share",
        },
        width: 600,
        footer: `
        <button id="copyLink" class="swal-buttons-share" ><i class="fas fa-link fa-xl"></i></button>
        <button id="shareFB" class="swal-buttons-share" ><i class="fa-brands fa-facebook-f fa-xl" style="color: #0433ff;"></i></button>
        <button id="shareGmail" class="swal-buttons-share" ><i class="fa-solid fa-envelope fa-xl"></i></button>
        `,
      });
      document.getElementById("copyLink").addEventListener("click", () => {
        const linkInput = document.getElementById("link");
        linkInput.select();
        document.execCommand("copy");
        Swal.fire({
          title: "Copied!",
          text: "The link has been copied.",
          icon: "success",
          showCloseButton: true,
          showConfirmButton: true,
          confirmButtonColor: "#0c62b5",
        });
      });

      document.getElementById("shareFB").addEventListener("click", () => {
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=https://www.youtube.com/watch?v=cvMjhfzvZCk`;
        window.open(facebookShareUrl, "_blank");
      });
      document.getElementById("shareGmail").addEventListener("click", () => {
        const subject = "Chia sẻ link"; // Chủ đề của email

        const body = encodeURIComponent(
          `Xin chào,\n\nTôi muốn chia sẻ với bạn đường dẫn sau:\n${url}`
        );

        const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;

        window.location.href = mailtoUrl;
      });
    },
    downloadFile(url) {
      // Tạo một phần tử a ẩn để tải xuống
      const link = document.createElement("a");
      link.href = "http://localhost:8080/HDSD/" + url;
      link.target = "_blank"; // Mở trong tab mới
      link.download = ""; // Tự động tải xuống
      link.style.display = "none";
      document.body.appendChild(link);

      // Kích hoạt sự kiện nhấp chuột để tải xuống
      link.click();

      // Loại bỏ phần tử a sau khi đã tải xuống
      document.body.removeChild(link);
    },
    async search() {
      this.dsSearch = await accountService.timKiemChung(this.inputSearch);
      this.showDivSearch = true;
    },
    async handleSelected(item) {
      const dvsItemSearch = this.dvsItems.find(
        (element) => element.id === item.MADV_1
      );
      let phItemSearch = {};
      if (item.MAPHCN_1) {
        phItemSearch = dvsItemSearch.phItems.find(
          (element) => element.id === item.MAPHCN_1
        );
      }
      let cnItemSearch = {};
      if (item.MACHUCNANG_1) {
        cnItemSearch = phItemSearch.cnItems.find(
          (element) => element.id === item.MACHUCNANG_1
        );
      }
      let lItemSearch = {};
      if (item.MALOAI) {
        lItemSearch = cnItemSearch.LoaiItems.find(
          (element) => element.id === item.MALOAI
        );
      }
      let hdsdItemSearch = {};
      if (item.MAHDSD_1 && item.MACHUCNANG_1) {
        hdsdItemSearch = lItemSearch.HDSDItems.find(
          (element) => element.id === item.MAHDSD_1
        );
      }
      let pbhdsdItemSearch = {};
      if (item.MAPHIENBAN_1 && item.MACHUCNANG_1) {
        pbhdsdItemSearch = hdsdItemSearch.PbHDSDItems.find(
          (element) => element.id === item.MAPHIENBAN_1
        );
      }

      const params = {
        dvsItem: dvsItemSearch,
        phItem: phItemSearch,
        cnItem: cnItemSearch,
        lItem: lItemSearch,
        hdsdcItem: {},
        pbhdsdcItem: {},
        hdsdItem: hdsdItemSearch,
        pbhdsdItem: pbhdsdItemSearch,
      };
      const queryString = encodeURIComponent(JSON.stringify(params));
      const url = this.$route.path + "?param=" + queryString;
      await this.$router.push(url);
      location.reload();
    },
    handleKeyPress(event) {
      if (event.key === "Enter") {
        this.search();
      }
    },
    handleClickOutside(event) {
      const target = event.target;
      const searchDiv = this.$refs.searchDiv;

      if (searchDiv && !searchDiv.contains(target)) {
        this.showDivSearch = false;
      }
    },
    itemExists(item) {
      // Kiểm tra điều kiện và trả về true nếu item tồn tại, ngược lại trả về false.
      if (item.MAHDSD && item.MACHUCNANG_1) {
        // Điều kiện 1: Item tồn tại khi có MAHDSD và MACHUCNANG_1
        return true;
      } else if (item.MAPHIENBAN && item.MACHUCNANG_1) {
        // Điều kiện 2: Item tồn tại khi có MAPHIENBAN và MACHUCNANG_1
        return true;
      }
      return false;
    },
    async checkLikeDvs() {
      const thongTinDoi = {};
      thongTinDoi.MaNguoiDung = this.account.MaNguoiDung;
      thongTinDoi.MaDV = this.dvsItem.id;
      thongTinDoi.MaHDSD = null;
      thongTinDoi.MaPhienBan = null;
      thongTinDoi.MaPHCN = null;
      thongTinDoi.MaChucNang = null;
      thongTinDoi.isCheck = this.likeDvs;
      this.likeDvs = await accountService.danhDauYeuThich(thongTinDoi);
      this.dvsItem.likeDvs = this.likeDvs;
    },
    async checkLikeHdsdc() {
      const thongTinDoi = {};
      thongTinDoi.MaNguoiDung = this.account.MaNguoiDung;
      thongTinDoi.MaDV = null;
      thongTinDoi.MaHDSD = this.hdsdcItem.id;
      thongTinDoi.MaPhienBan = null;
      thongTinDoi.MaPHCN = null;
      thongTinDoi.MaChucNang = null;
      thongTinDoi.isCheck = this.likeHdsdc;
      this.likeHdsdc = await accountService.danhDauYeuThich(thongTinDoi);
      this.hdsdcItem.likeHdsdc = this.likeHdsdc;
    },
    async checkLikePbHdsdc() {
      const thongTinDoi = {};
      thongTinDoi.MaNguoiDung = this.account.MaNguoiDung;
      thongTinDoi.MaDV = null;
      thongTinDoi.MaHDSD = null;
      thongTinDoi.MaPhienBan = this.pbhdsdcItem.id;
      thongTinDoi.MaPHCN = null;
      thongTinDoi.MaChucNang = null;
      thongTinDoi.isCheck = this.likePbHdsdc;
      this.likePbHdsdc = await accountService.danhDauYeuThich(thongTinDoi);
      this.pbhdsdcItem.likePbHdsdc = this.likePbHdsdc;
    },
    async checkLikePh() {
      const thongTinDoi = {};
      thongTinDoi.MaNguoiDung = this.account.MaNguoiDung;
      thongTinDoi.MaDV = null;
      thongTinDoi.MaHDSD = null;
      thongTinDoi.MaPhienBan = null;
      thongTinDoi.MaPHCN = this.phItem.id;
      thongTinDoi.MaChucNang = null;
      thongTinDoi.isCheck = this.likePh;
      this.likePh = await accountService.danhDauYeuThich(thongTinDoi);
      this.dvsItems.forEach((item) => {
        item.phItems.forEach((element) => {
          if (element.id === this.phItem.id) {
            element.likePh = this.likePh;
          }
        });
      });
    },
    async checkLikeCn() {
      const thongTinDoi = {};
      thongTinDoi.MaNguoiDung = this.account.MaNguoiDung;
      thongTinDoi.MaDV = null;
      thongTinDoi.MaHDSD = null;
      thongTinDoi.MaPhienBan = null;
      thongTinDoi.MaPHCN = null;
      thongTinDoi.MaChucNang = this.cnItem.id;
      thongTinDoi.isCheck = this.likeCn;
      this.likeCn = await accountService.danhDauYeuThich(thongTinDoi);
      this.cnItem.likeCn = this.likeCn;
    },
    async checkLikeHdsd() {
      const thongTinDoi = {};
      thongTinDoi.MaNguoiDung = this.account.MaNguoiDung;
      thongTinDoi.MaDV = null;
      thongTinDoi.MaHDSD = this.hdsdItem.id;
      thongTinDoi.MaPhienBan = null;
      thongTinDoi.MaPHCN = null;
      thongTinDoi.MaChucNang = null;
      thongTinDoi.isCheck = this.likeHdsd;
      this.likeHdsd = await accountService.danhDauYeuThich(thongTinDoi);
      this.hdsdItem.likeHdsd = this.likeHdsd;
    },
    async checkLikePbHdsd() {
      const thongTinDoi = {};
      thongTinDoi.MaNguoiDung = this.account.MaNguoiDung;
      thongTinDoi.MaDV = null;
      thongTinDoi.MaHDSD = null;
      thongTinDoi.MaPhienBan = this.pbhdsdItem.id;
      thongTinDoi.MaPHCN = null;
      thongTinDoi.MaChucNang = null;
      thongTinDoi.isCheck = this.likePbHdsd;
      this.likePbHdsd = await accountService.danhDauYeuThich(thongTinDoi);
      this.pbhdsdItem.likePbHdsd = this.likePbHdsd;
    },
    checkCommentMax() {
      Swal.fire({
        position: "center",
        title: "Bình luận tối đa 1024 kí tự!",
        icon: "error",
        confirmButtonColor: "#0c62b5",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    checkCommentMin() {
      Swal.fire({
        position: "center",
        title: "Vui lòng nhập bình luận!",
        icon: "error",
        confirmButtonColor: "#0c62b5",
        showConfirmButton: true,
        allowOutsideClick: false,
        timerProgressBar: false,
        width: 500,
      });
    },
    async sentCommentDvs() {
      if (this.comment.length > 0) {
        const thongTinBL = {};
        thongTinBL.MaNguoiDung = this.account.MaNguoiDung;
        thongTinBL.MaDV = this.dvsItem.id;
        thongTinBL.MaHDSD = null;
        thongTinBL.MaPhienBan = null;
        thongTinBL.MaPHCN = null;
        thongTinBL.MaChucNang = null;
        thongTinBL.NoiDungBL = this.comment;
        await accountService.binhLuan(thongTinBL).then(async () => {
          this.dsBinhLuanDvs = await accountService.layBinhLuanDvs(
            this.dvsItem.id
          );
          this.comment = "";
          this.binhLuanVisible = true;
        });
      } else if (this.comment.length >= 1024) {
        this.checkCommentMax();
      } else {
        this.checkCommentMin();
      }
    },
    async traLoiCommentDvs() {
      if (this.comment.length > 0) {
        const thongTinBL = {};
        thongTinBL.MaNguoiDung = this.account.MaNguoiDung;
        thongTinBL.MaDV = this.dvsItem.id;
        thongTinBL.MaHDSD = null;
        thongTinBL.MaPhienBan = null;
        thongTinBL.MaPHCN = null;
        thongTinBL.MaChucNang = null;
        thongTinBL.NoiDungBL = this.comment;
        thongTinBL.MaBL = this.itemReplyBinhLuan.MABL;
        thongTinBL.TraLoiMaND = this.itemReplyBinhLuan.MANGUOIDUNG;
        await accountService.traLoiBinhLuan(thongTinBL).then(async () => {
          this.dsBinhLuanDvs = await accountService.layBinhLuanDvs(
            this.dvsItem.id
          );
          this.comment = "";
          this.binhLuanVisible = true;
        });
      } else if (this.comment.length >= 1024) {
        this.checkCommentMax();
      } else {
        this.checkCommentMin();
      }
    },
    async sentCommentHdsdc() {
      if (this.comment.length > 0) {
        const thongTinBL = {};
        thongTinBL.MaNguoiDung = this.account.MaNguoiDung;
        thongTinBL.MaDV = null;
        thongTinBL.MaHDSD = this.hdsdcItem.id;
        thongTinBL.MaPhienBan = null;
        thongTinBL.MaPHCN = null;
        thongTinBL.MaChucNang = null;
        thongTinBL.NoiDungBL = this.comment;
        await accountService.binhLuan(thongTinBL).then(async () => {
          this.dsBinhLuanHdsdc = await accountService.layBinhLuanHdsdc(
            this.hdsdcItem.id
          );
          this.comment = "";
          this.binhLuanVisible = true;
        });
      } else if (this.comment.length >= 1024) {
        this.checkCommentMax();
      } else {
        this.checkCommentMin();
      }
    },
    async traLoiCommentHdsdc() {
      if (this.comment.length > 0) {
        const thongTinBL = {};
        thongTinBL.MaNguoiDung = this.account.MaNguoiDung;
        thongTinBL.MaDV = null;
        thongTinBL.MaHDSD = this.hdsdcItem.id;
        thongTinBL.MaPhienBan = null;
        thongTinBL.MaPHCN = null;
        thongTinBL.MaChucNang = null;
        thongTinBL.NoiDungBL = this.comment;
        thongTinBL.MaBL = this.itemReplyBinhLuan.MABL;
        thongTinBL.TraLoiMaND = this.itemReplyBinhLuan.MANGUOIDUNG;
        await accountService.traLoiBinhLuan(thongTinBL).then(async () => {
          this.dsBinhLuanHdsdc = await accountService.layBinhLuanHdsdc(
            this.hdsdcItem.id
          );
          this.comment = "";
          this.binhLuanVisible = true;
        });
      } else if (this.comment.length >= 1024) {
        this.checkCommentMax();
      } else {
        this.checkCommentMin();
      }
    },
    async sentCommentPbHdsdc() {
      if (this.comment.length > 0) {
        const thongTinBL = {};
        thongTinBL.MaNguoiDung = this.account.MaNguoiDung;
        thongTinBL.MaDV = null;
        thongTinBL.MaHDSD = null;
        thongTinBL.MaPhienBan = this.pbhdsdcItem.id;
        thongTinBL.MaPHCN = null;
        thongTinBL.MaChucNang = null;
        thongTinBL.NoiDungBL = this.comment;
        await accountService.binhLuan(thongTinBL).then(async () => {
          this.dsBinhLuanPbHdsdc = await accountService.layBinhLuanPbHdsdc(
            this.pbhdsdcItem.id
          );
          this.comment = "";
          this.binhLuanVisible = true;
        });
      } else if (this.comment.length >= 1024) {
        this.checkCommentMax();
      } else {
        this.checkCommentMin();
      }
    },
    async traLoiCommentPbHdsdc() {
      if (this.comment.length > 0) {
        const thongTinBL = {};
        thongTinBL.MaNguoiDung = this.account.MaNguoiDung;
        thongTinBL.MaDV = null;
        thongTinBL.MaHDSD = null;
        thongTinBL.MaPhienBan = this.pbhdsdcItem.id;
        thongTinBL.MaPHCN = null;
        thongTinBL.MaChucNang = null;
        thongTinBL.NoiDungBL = this.comment;
        thongTinBL.MaBL = this.itemReplyBinhLuan.MABL;
        thongTinBL.TraLoiMaND = this.itemReplyBinhLuan.MANGUOIDUNG;
        await accountService.traLoiBinhLuan(thongTinBL).then(async () => {
          this.dsBinhLuanPbHdsdc = await accountService.layBinhLuanPbHdsdc(
            this.pbhdsdcItem.id
          );
          this.comment = "";
          this.binhLuanVisible = true;
        });
      } else if (this.comment.length >= 1024) {
        this.checkCommentMax();
      } else {
        this.checkCommentMin();
      }
    },
    async sentCommentPHCN() {
      if (this.comment.length > 0) {
        const thongTinBL = {};
        thongTinBL.MaNguoiDung = this.account.MaNguoiDung;
        thongTinBL.MaDV = null;
        thongTinBL.MaHDSD = null;
        thongTinBL.MaPhienBan = null;
        thongTinBL.MaPHCN = this.phItem.id;
        thongTinBL.MaChucNang = null;
        thongTinBL.NoiDungBL = this.comment;
        await accountService.binhLuan(thongTinBL).then(async () => {
          this.dsBinhLuanPh = await accountService.layBinhLuanPHCN(
            this.phItem.id
          );
          this.comment = "";
          this.binhLuanVisible = true;
        });
      } else if (this.comment.length >= 1024) {
        this.checkCommentMax();
      } else {
        this.checkCommentMin();
      }
    },
    async traLoiCommentPHCN() {
      if (this.comment.length > 0) {
        const thongTinBL = {};
        thongTinBL.MaNguoiDung = this.account.MaNguoiDung;
        thongTinBL.MaDV = null;
        thongTinBL.MaHDSD = null;
        thongTinBL.MaPhienBan = null;
        thongTinBL.MaPHCN = this.phItem.id;
        thongTinBL.MaChucNang = null;
        thongTinBL.NoiDungBL = this.comment;
        thongTinBL.MaBL = this.itemReplyBinhLuan.MABL;
        thongTinBL.TraLoiMaND = this.itemReplyBinhLuan.MANGUOIDUNG;
        await accountService.traLoiBinhLuan(thongTinBL).then(async () => {
          this.dsBinhLuanPh = await accountService.layBinhLuanPHCN(
            this.phItem.id
          );
          this.comment = "";
          this.binhLuanVisible = true;
        });
      } else if (this.comment.length >= 1024) {
        this.checkCommentMax();
      } else {
        this.checkCommentMin();
      }
    },
    async sentCommentChucNang() {
      if (this.comment.length > 0) {
        const thongTinBL = {};
        thongTinBL.MaNguoiDung = this.account.MaNguoiDung;
        thongTinBL.MaDV = null;
        thongTinBL.MaHDSD = null;
        thongTinBL.MaPhienBan = null;
        thongTinBL.MaPHCN = null;
        thongTinBL.MaChucNang = this.cnItem.id;
        thongTinBL.NoiDungBL = this.comment;
        await accountService.binhLuan(thongTinBL).then(async () => {
          this.dsBinhLuanCn = await accountService.layBinhLuanChucNang(
            this.cnItem.id
          );
          this.comment = "";
          this.binhLuanVisible = true;
        });
      } else if (this.comment.length >= 1024) {
        this.checkCommentMax();
      } else {
        this.checkCommentMin();
      }
    },
    async traLoiCommentChucNang() {
      if (this.comment.length > 0) {
        const thongTinBL = {};
        thongTinBL.MaNguoiDung = this.account.MaNguoiDung;
        thongTinBL.MaDV = null;
        thongTinBL.MaHDSD = null;
        thongTinBL.MaPhienBan = null;
        thongTinBL.MaPHCN = null;
        thongTinBL.MaChucNang = this.cnItem.id;
        thongTinBL.NoiDungBL = this.comment;
        thongTinBL.MaBL = this.itemReplyBinhLuan.MABL;
        thongTinBL.TraLoiMaND = this.itemReplyBinhLuan.MANGUOIDUNG;
        await accountService.traLoiBinhLuan(thongTinBL).then(async () => {
          this.dsBinhLuanCn = await accountService.layBinhLuanChucNang(
            this.cnItem.id
          );
          this.comment = "";
          this.binhLuanVisible = true;
        });
      } else if (this.comment.length >= 1024) {
        this.checkCommentMax();
      } else {
        this.checkCommentMin();
      }
    },
    async sentCommentHdsd() {
      if (this.comment.length > 0) {
        const thongTinBL = {};
        thongTinBL.MaNguoiDung = this.account.MaNguoiDung;
        thongTinBL.MaDV = null;
        thongTinBL.MaHDSD = this.hdsdItem.id;
        thongTinBL.MaPhienBan = null;
        thongTinBL.MaPHCN = null;
        thongTinBL.MaChucNang = null;
        thongTinBL.NoiDungBL = this.comment;
        await accountService.binhLuan(thongTinBL).then(async () => {
          this.dsBinhLuanHdsd = await accountService.layBinhLuanHdsd(
            this.hdsdItem.id
          );
          this.comment = "";
          this.binhLuanVisible = true;
        });
      } else if (this.comment.length >= 1024) {
        this.checkCommentMax();
      } else {
        this.checkCommentMin();
      }
    },
    async traLoiCommentHdsd() {
      if (this.comment.length > 0) {
        const thongTinBL = {};
        thongTinBL.MaNguoiDung = this.account.MaNguoiDung;
        thongTinBL.MaDV = null;
        thongTinBL.MaHDSD = this.hdsdItem.id;
        thongTinBL.MaPhienBan = null;
        thongTinBL.MaPHCN = null;
        thongTinBL.MaChucNang = null;
        thongTinBL.NoiDungBL = this.comment;
        thongTinBL.MaBL = this.itemReplyBinhLuan.MABL;
        thongTinBL.TraLoiMaND = this.itemReplyBinhLuan.MANGUOIDUNG;
        await accountService.traLoiBinhLuan(thongTinBL).then(async () => {
          this.dsBinhLuanHdsd = await accountService.layBinhLuanHdsd(
            this.hdsdItem.id
          );
          this.comment = "";
          this.binhLuanVisible = true;
        });
      } else if (this.comment.length >= 1024) {
        this.checkCommentMax();
      } else {
        this.checkCommentMin();
      }
    },
    async sentCommentPbHdsd() {
      if (this.comment.length > 0) {
        const thongTinBL = {};
        thongTinBL.MaNguoiDung = this.account.MaNguoiDung;
        thongTinBL.MaDV = null;
        thongTinBL.MaHDSD = null;
        thongTinBL.MaPhienBan = this.pbhdsdItem.id;
        thongTinBL.MaPHCN = null;
        thongTinBL.MaChucNang = null;
        thongTinBL.NoiDungBL = this.comment;
        await accountService.binhLuan(thongTinBL).then(async () => {
          this.dsBinhLuanPbHdsd = await accountService.layBinhLuanPbHdsd(
            this.pbhdsdItem.id
          );
          this.comment = "";
          this.binhLuanVisible = true;
        });
      } else if (this.comment.length >= 1024) {
        this.checkCommentMax();
      } else {
        this.checkCommentMin();
      }
    },
    async traLoiCommentPbHdsd() {
      if (this.comment.length > 0) {
        const thongTinBL = {};
        thongTinBL.MaNguoiDung = this.account.MaNguoiDung;
        thongTinBL.MaDV = null;
        thongTinBL.MaHDSD = null;
        thongTinBL.MaPhienBan = this.pbhdsdItem.id;
        thongTinBL.MaPHCN = null;
        thongTinBL.MaChucNang = null;
        thongTinBL.NoiDungBL = this.comment;
        thongTinBL.MaBL = this.itemReplyBinhLuan.MABL;
        thongTinBL.TraLoiMaND = this.itemReplyBinhLuan.MANGUOIDUNG;
        await accountService.traLoiBinhLuan(thongTinBL).then(async () => {
          this.dsBinhLuanPbHdsd = await accountService.layBinhLuanPbHdsd(
            this.pbhdsdItem.id
          );
          this.comment = "";
          this.binhLuanVisible = true;
        });
      } else if (this.comment.length >= 1024) {
        this.checkCommentMax();
      } else {
        this.checkCommentMin();
      }
    },
    traLoiBinhLuan(item) {
      this.binhLuanVisible = false;
      this.itemReplyBinhLuan = item;
      this.comment = "@" + item.TENHIENTHI + " ";
    },
    traLoiBinhLuanCuaBinhLuan(item, element) {
      this.binhLuanVisible = false;
      this.itemReplyBinhLuan = item;
      this.itemReplyBinhLuan.TENHIENTHI = element.TENHIENTHI;
      this.itemReplyBinhLuan.MANGUOIDUNG = element.MANGUOIDUNG;
      this.comment = "@" + element.TENHIENTHI + " ";
    },
    huyTraLoi() {
      this.binhLuanVisible = true;
      this.itemReplyBinhLuan = {};
    },
    async fetchComments() {
      if (this.dvsItem.id) {
        this.dsBinhLuanDvs = await accountService.layBinhLuanDvs(
          this.dvsItem.id
        );
      } else if (this.phItem.id) {
        this.dsBinhLuanPh = await accountService.layBinhLuanPHCN(
          this.phItem.id
        );
      } else if (this.cnItem.id) {
        this.dsBinhLuanCn = await accountService.layBinhLuanChucNang(
          this.cnItem.id
        );
      } else if (this.hdsdItem.id) {
        this.dsBinhLuanHdsd = await accountService.layBinhLuanHdsd(
          this.hdsdItem.id
        );
      } else if (this.pbhdsdItem.id) {
        this.dsBinhLuanPbHdsd = await accountService.layBinhLuanPbHdsd(
          this.pbhdsdItem.id
        );
      } else if (this.hdsdcItem.id) {
        this.dsBinhLuanHdsdc = await accountService.layBinhLuanHdsdc(
          this.hdsdcItem.id
        );
      } else if (this.pbhdsdcItem.id) {
        this.dsBinhLuanPbHdsdc = await accountService.layBinhLuanPbHdsdc(
          this.pbhdsdcItem.id
        );
      }
    },
    startFetchingComments() {
      // Gọi hàm fetchComments ban đầu
      this.fetchComments();

      // Thiết lập chạy định kỳ hàm fetchComments sau mỗi 10 giây
      setInterval(() => {
        this.fetchComments();
      }, 10000);
    },
  },
  watch: {
    selectedOption(newOption) {
      this.dvsVisible = newOption === "dvs";
      this.phVisible = newOption === "phcn";
    },
    selectedOptionSua(newOption) {
      this.sdvsVisible = newOption === "sdvs";
      this.sphVisible = newOption === "sphcn";
    },
    selectedOptionHDSDChung(newOption) {
      this.hdsdcVisible = newOption === "hdsdc";
      this.shdsdcVisible = newOption === "shdsdc";
    },
    dvsItem: {
      deep: true,
      async handler(newVal) {
        if (newVal.id) {
          this.binhLuanVisible = true;
          this.likeDvs = await accountService.layYeuThich(
            this.account.MaNguoiDung,
            newVal.id,
            null,
            null,
            null,
            null
          );
          this.dvsItemsVisible = false;
          this.dvsItemVisible = false;
          this.hdsdcItemVisible = false;
          this.pbhdsdcItemVisible = false;
          this.phItemVisible = false;
          this.cnItemVisible = false;
          this.lItemVisible = false;
          this.hdsdItemVisible = false;
          this.pbhdsdItemVisible = false;
          this.fileName = "";
          this.file = null;
          this.optionDvs = newVal.id;
          this.dsBinhLuanDvs = await accountService.layBinhLuanDvs(newVal.id);
          this.optionsCn = await accountService.layChucNangTheoDichVuSo(
            newVal.id
          );
          if (this.accountInfo.Quyen === "AdminService") {
            this.isAdmin = await accountService.checkQuyenDichVuSo(
              this.account.MaNguoiDung,
              newVal.id
            );
          }
          if (!this.hdsdcItem.id && !this.phItem.id) {
            this.selectedOptionSua = "sdvs";
            this.selectedOption = "dvs";
            if (
              (this.homeVisible === false &&
                this.addHdsdcVisible === true &&
                this.selectedOptionHDSDChung === "hdsdc") ||
              (this.homeVisible === false && this.addHdsdVisible === true) ||
              (this.homeVisible === false && this.addPbHdsdVisible === true)
            ) {
              this.showFormAddCn();
            } else if (
              (this.homeVisible === false && this.suaCnVisible === true) ||
              (this.homeVisible === false &&
                this.addHdsdcVisible === true &&
                this.selectedOptionHDSDChung === "shdsdc") ||
              (this.homeVisible == false && this.suaHdsdVisible == true) ||
              (this.homeVisible == false && this.suaPbHdsdVisible == true)
            ) {
              this.showFormEdit();
            }
          }
          this.optionsHdsdc = await accountService.layPhienBanHDSDChung(
            this.optionDvs
          );
        }
      },
    },
    phItem: {
      deep: true,
      async handler(newVal) {
        if (newVal.id) {
          this.dsBinhLuanPh = await accountService.layBinhLuanPHCN(newVal.id);
          this.likeDvs = await accountService.layYeuThich(
            this.account.MaNguoiDung,
            null,
            newVal.id,
            null,
            null,
            null
          );
          this.selectedOptionSua = "sphcn";
          this.selectedOption = "phcn";
          this.optionPh = newVal.id;
          this.optionsCn = await accountService.layChucNangTheoDichVuSo(
            this.optionDvs
          );
          if (!this.cnItem.id) {
            if (
              (this.homeVisible === false &&
                this.addHdsdcVisible === true &&
                this.selectedOptionHDSDChung === "hdsdc") ||
              (this.homeVisible === false && this.addHdsdVisible === true) ||
              (this.homeVisible === false && this.addPbHdsdVisible === true)
            ) {
              this.showFormAddCn();
            } else if (
              (this.homeVisible === false && this.suaCnVisible === true) ||
              (this.homeVisible === false &&
                this.addHdsdcVisible === true &&
                this.selectedOptionHDSDChung === "shdsdc") ||
              (this.homeVisible == false && this.suaHdsdVisible == true) ||
              (this.homeVisible == false && this.suaPbHdsdVisible == true)
            ) {
              this.showFormEdit();
            }
          }
        }
      },
    },
    cnItem: {
      deep: true,
      async handler(newVal) {
        if (newVal.id) {
          this.dsBinhLuanCn = await accountService.layBinhLuanChucNang(
            newVal.id
          );
          this.likeDvs = await accountService.layYeuThich(
            this.account.MaNguoiDung,
            null,
            null,
            newVal.id,
            null,
            null
          );
          this.optionCn = newVal.id;
          this.tencnmoi = newVal.title;
          this.optionsHdsd = await accountService.layHDSDTheoChucNang(
            this.optionCn,
            this.optionLoai
          );
          if (!this.lItem.id && !this.hdsdItem.id) {
            this.optionLoai = -1;
            if (
              (this.homeVisible === false && this.addCnVisible === true) ||
              (this.homeVisible === false && this.addVisible === true) ||
              (this.homeVisible === false &&
                this.addHdsdcVisible === true &&
                this.selectedOptionHDSDChung === "hdsdc") ||
              (this.homeVisible === false && this.addPbHdsdVisible === true)
            ) {
              this.showFormAddHdsd();
            } else if (
              (this.homeVisible === false && this.editVisible === true) ||
              (this.homeVisible === false &&
                this.addHdsdcVisible === true &&
                this.selectedOptionHDSDChung === "shdsdc") ||
              (this.homeVisible == false && this.suaHdsdVisible == true) ||
              (this.homeVisible == false && this.suaPbHdsdVisible == true)
            ) {
              this.showFormSuaCn();
            } else if (
              this.homeVisible === false &&
              this.revertVisible === true
            ) {
              this.showFormRevertHdsd();
            }
          }
        }
      },
    },
    hdsdcItem: {
      deep: true,
      async handler(newVal) {
        if (newVal.id) {
          this.dsBinhLuanHdsdc = await accountService.layBinhLuanHdsdc(
            newVal.id
          );
          this.likeDvs = await accountService.layYeuThich(
            this.account.MaNguoiDung,
            null,
            null,
            null,
            newVal.id,
            null
          );
          if (!this.pbhdsdcItem.id) {
            this.tentieude = "";
            this.tentieudem = "";
            this.fileNameMoi = "";
          }
          if (
            (this.homeVisible === false && this.addVisible === true) ||
            (this.homeVisible == false && this.addCnVisible == true) ||
            (this.homeVisible === false && this.addHdsdVisible === true) ||
            (this.homeVisible === false && this.addPbHdsdVisible === true)
          ) {
            this.showFormAddHdsdChung();
          } else if (
            (this.homeVisible === false && this.editVisible === true) ||
            (this.homeVisible == false && this.suaCnVisible == true) ||
            (this.homeVisible == false && this.suaHdsdVisible == true) ||
            (this.homeVisible == false && this.suaPbHdsdVisible == true)
          ) {
            this.showFormEditHdsdChung();
          } else if (
            this.homeVisible === false &&
            this.revertHdsdVisible === true
          ) {
            this.showFormRevert();
          }
        }
      },
    },
    pbhdsdcItem: {
      deep: true,
      async handler(newVal) {
        if (newVal.id) {
          this.dsBinhLuanPbHdsdc = await accountService.layBinhLuanPbHdsdc(
            newVal.id
          );
          this.likeDvs = await accountService.layYeuThich(
            this.account.MaNguoiDung,
            null,
            null,
            null,
            null,
            newVal.id
          );
          this.optionHdsdc = newVal.id;
          this.tentieudem = newVal.title;
          this.fileNameMoi = newVal.url;
          this.file = null;
          this.historyHDSDChung = await accountService.layLichSuSuaHDSDChung(
            this.optionDvs,
            newVal.id
          );
        }
      },
    },
    lItem: {
      deep: true,
      async handler(newVal) {
        if (newVal.id) {
          // if (newVal.id === 1) {
          //   // this.
          // };
          this.optionLoai = newVal.id;
          this.optionsHdsd = await accountService.layHDSDTheoChucNang(
            this.optionCn,
            this.optionLoai
          );
          if (!this.hdsdItem.id) {
            if (
              (this.homeVisible === false && this.addCnVisible === true) ||
              (this.homeVisible === false && this.addVisible === true) ||
              (this.homeVisible === false &&
                this.addHdsdcVisible === true &&
                this.selectedOptionHDSDChung === "hdsdc") ||
              (this.homeVisible === false && this.addPbHdsdVisible === true)
            ) {
              this.showFormAddHdsd();
            } else if (
              (this.homeVisible === false && this.editVisible === true) ||
              (this.homeVisible === false &&
                this.addHdsdcVisible === true &&
                this.selectedOptionHDSDChung === "shdsdc") ||
              (this.homeVisible == false && this.suaHdsdVisible == true) ||
              (this.homeVisible == false && this.suaPbHdsdVisible == true)
            ) {
              this.showFormSuaCn();
            }
          }
        }
      },
    },
    hdsdItem: {
      deep: true,
      async handler(newVal) {
        if (newVal.id) {
          this.dsBinhLuanHdsd = await accountService.layBinhLuanHdsd(newVal.id);
          this.likeDvs = await accountService.layYeuThich(
            this.account.MaNguoiDung,
            null,
            null,
            null,
            newVal.id,
            null
          );
          this.optionHdsd = newVal.id;
          this.tenhdsdm = newVal.title;
          this.optionsPbHdsd = await accountService.layPbHDSD(newVal.id);
          if (!this.pbhdsdItem.id) {
            if (
              (this.homeVisible === false && this.addCnVisible === true) ||
              (this.homeVisible === false && this.addVisible === true) ||
              (this.homeVisible === false &&
                this.addHdsdcVisible === true &&
                this.selectedOptionHDSDChung === "hdsdc") ||
              (this.homeVisible === false && this.addHdsdVisible === true)
            ) {
              this.showFormAddPbHdsd();
            } else if (
              (this.homeVisible === false && this.editVisible === true) ||
              (this.homeVisible === false &&
                this.addHdsdcVisible === true &&
                this.selectedOptionHDSDChung === "shdsdc") ||
              (this.homeVisible == false && this.suaCnVisible == true) ||
              (this.homeVisible == false && this.suaPbHdsdVisible == true)
            ) {
              this.showFormSuaHdsd();
            }
          }
        }
      },
    },
    pbhdsdItem: {
      deep: true,
      async handler(newVal) {
        if (newVal.id) {
          this.dsBinhLuanPbHdsd = await accountService.layBinhLuanPbHdsd(
            newVal.id
          );
          this.likeDvs = await accountService.layYeuThich(
            this.account.MaNguoiDung,
            null,
            null,
            null,
            null,
            newVal.id
          );
          this.optionPbHdsd = newVal.id;
          this.tieudepbm = newVal.title;
          this.fileNameMoi = newVal.url;
          this.file = null;
          this.historyHDSDChung = await accountService.layLichSuSuaHDSD(
            this.optionHdsd,
            newVal.id
          );
          if (
            (this.homeVisible === false && this.editVisible === true) ||
            (this.homeVisible === false &&
              this.addHdsdcVisible === true &&
              this.selectedOptionHDSDChung === "shdsdc") ||
            (this.homeVisible == false && this.suaCnVisible == true) ||
            (this.homeVisible == false && this.suaHdsdVisible == true)
          ) {
            this.showFormEditPbHdsd();
          }
        }
      },
    },
  },
  async mounted() {
    document.addEventListener("click", this.handleClickOutside);
    this.startFetchingComments();
  },
  // destroyed() {
  //   document.removeEventListener("click", this.handleClickOutside);
  // },
};
</script>

<template>
  <div class="khung-container">
    <!-- Khung xem -->
    <div class="pd-content" v-if="viewVisible">
      <div class="title-content mb-2">
        <button @click="showFormHome" class="btn-img">
          <img class="img-width" src="../icons/Mt-back.png" alt="" />
        </button>
        <h3 v-if="!pbhdsdItem.id && pbhdsdcItem.id" class="h3-center">
          {{ pbhdsdcItem.title }}
        </h3>
        <h3 v-if="!pbhdsdcItem.id && pbhdsdItem.id" class="h3-center">
          {{ pbhdsdItem.title }}
        </h3>
        <div class="img-width"></div>
      </div>

      <iframe class="khung-jframe" :src="pbhdsdcItem.id
          ? getPdfUrl(pbhdsdcItem.url)
          : getPdfUrl(pbhdsdItem.url)
        " type="application/pdf" width="100%" height="100%"></iframe>
    </div>

    <!-- Khung home -->
    <div v-if="homeVisible" class="pd-content">
      <div class="title-content">
        <h3 class="title-mw">
          Dịch vụ số
          {{ dvsItem.id ? "/ " + dvsItem.title : "" }}
          {{
            phItem.id && dvsItem.phItems.some((item) => item === phItem)
            ? "/ " + phItem.title
            : ""
          }}
          {{
            hdsdcItem.id &&
            dvsItem.hdsdChungItems.some((item) => item === hdsdcItem)
            ? "/ " + hdsdcItem.title
            : ""
          }}
          {{
            cnItem.id && phItem.cnItems.some((item) => item === cnItem)
            ? "/ " + cnItem.title
            : ""
          }}
          {{
            lItem.id && cnItem.LoaiItems.some((item) => item === lItem)
            ? "/ " + lItem.title
            : ""
          }}
          {{
            hdsdItem.id && lItem.HDSDItems.some((item) => item === hdsdItem)
            ? "/ " + hdsdItem.title
            : ""
          }}
          {{
            pbhdsdItem.id &&
            hdsdItem.PbHDSDItems.some((item) => item === pbhdsdItem)
            ? "/ " + pbhdsdItem.title
            : ""
          }}
          {{
            pbhdsdcItem.id &&
            hdsdcItem.pbhdsdChungItems.some((item) => item === pbhdsdcItem)
            ? "/ " + pbhdsdcItem.title
            : ""
          }}
        </h3>

        <div class="all-btn button-group">
          <!-- <div v-if="dvsItem.id && !phItem.id && !hdsdcItem.id" class="search-content">
            <input type="search" class="form-control bg-search" placeholder="Tìm kiếm" aria-label="Search"
              aria-describedby="search-addon" v-model="inputSearch" @keyup="handleKeyPress" />
            <div class="input-group-append">
              <v-btn class="btn btn-primary search-btn" type="button" @click="search">
                <i class="fas fa-search"></i>
              </v-btn>
            </div>
            <div v-if="showDivSearch" ref="searchDiv" class="search-div-content mt-2"
              :class="{ 'show-div-search': showDivSearch }">
              <div class="canhgiua">
                <table v-if="dsSearch" v-for="item in dsSearch" class="list-item-search">
                  <tr @click="handleSelected(item)" v-if="itemExists(item) && item.MADV_1 === dvsItem.id">
                    {{
                      item.MAHDSD && item.MACHUCNANG_1
                      ? item.TIEUDEHDSD +
                      " - HDSD (" +
                      item.TENDV +
                      " - " +
                      item.TENCHUCNANG +
                      ")"
                      : item.MAPHIENBAN && item.MACHUCNANG_1
                        ? item.TIEUDEPHIENBAN +
                        " - Phiên bản HDSD (" +
                        item.TENDV +
                        " - " +
                        item.TENCHUCNANG +
                        " - " +
                        item.TIEUDEHDSD +
                        ") "
                        : null
                    }}
                  </tr>
                  <tr v-if="!item.MAHDSD &&
                        !item.MAPHIENBAN &&
                        item.MADV_1 !== dvsItem.id
                        ">
                    Không tìm thấy kết quả!
                  </tr>
                </table>
                <table v-else class="list-item-search">
                  <tr>
                    Không tìm thấy kết quả!
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <span class="space"></span> -->
          <div v-if="pbhdsdcItem.id || pbhdsdItem.id">
            <button @click="showViewFile" class="btn-ua">
              <img class="img-button" src="../icons/view.png" alt="" /> Xem
            </button>
          </div>

          <!-- Thêm dvs or phcn -->
          <div v-if="isAdmin &&
            !dvsItem.id &&
            !phItem.id &&
            !cnItem.id &&
            !lItem.id &&
            !hdsdItem.id &&
            !pbhdsdItem.id &&
            !hdsdcItem.id &&
            !pbhdsdcItem.id
            ">
            <button @click="showFormAdd" class="btn-ua">
              <img class="img-button" src="../icons/Plus.png" alt="" /> Thêm
            </button>
          </div>

          <!-- Thêm cn và sửa dvs or ph -->
          <div v-else-if="isAdmin &&
            dvsItem.id &&
            !cnItem.id &&
            !lItem.id &&
            !hdsdItem.id &&
            !pbhdsdItem.id &&
            !hdsdcItem.id &&
            !pbhdsdcItem.id
            ">
            <button @click="showFormAddCn" class="btn-ua">
              <img class="img-button" src="../icons/Plus.png" alt="" /> Thêm
            </button>
            <span class="space"></span>
            <button @click="showFormEdit" class="btn-ua">
              <img class="img-button" src="../icons/Pencil.png" alt="" /> Sửa
            </button>
          </div>

          <!-- Sửa cn và thêm hdsd -->
          <div v-else-if="isAdmin &&
            cnItem.id &&
            !lItem.id &&
            !hdsdItem.id &&
            !pbhdsdItem.id &&
            !hdsdcItem.id &&
            !pbhdsdcItem.id
            ">
            <button @click="showFormAddHdsd" class="btn-ua">
              <img class="img-button" src="../icons/Plus.png" alt="" /> Thêm
            </button>
            <span class="space"></span>
            <button @click="showFormSuaCn" class="btn-ua">
              <img class="img-button" src="../icons/Pencil.png" alt="" /> Sửa
            </button>
          </div>

          <!-- thêm hdsd -->
          <div v-else-if="isAdmin &&
            lItem.id &&
            !hdsdItem.id &&
            !pbhdsdItem.id &&
            !hdsdcItem.id &&
            !pbhdsdcItem.id
            ">
            <button @click="showFormAddHdsd" class="btn-ua">
              <img class="img-button" src="../icons/Plus.png" alt="" /> Thêm
            </button>
          </div>

          <div v-else-if="(isAdmin && hdsdcItem.id) ||
            (isAdmin &&
              pbhdsdcItem.id &&
              !lItem.id &&
              !hdsdItem.id &&
              !pbhdsdItem.id &&
              !dsvItem.id &&
              !phItem.id &&
              !cnItem.id)
            ">
            <span class="space"></span>
            <button @click="showFormAddHdsdChung" class="btn-ua">
              <img class="img-button" src="../icons/Plus.png" alt="" /> Thêm
            </button>
            <span class="space"></span>
            <button @click="showFormEditHdsdChung" class="btn-ua">
              <img class="img-button" src="../icons/Pencil.png" alt="" /> Sửa
            </button>
          </div>

          <!-- Sửa hdsd và thêm pbhdsd -->
          <div v-else-if="isAdmin &&
            hdsdItem.id &&
            !pbhdsdItem.id &&
            !hdsdcItem.id &&
            !pbhdsdcItem.id
            ">
            <span class="space"></span>
            <button @click="showFormAddPbHdsd" class="btn-ua">
              <img class="img-button" src="../icons/Plus.png" alt="" /> Thêm
            </button>
            <span class="space"></span>
            <button @click="showFormSuaHdsd" class="btn-ua">
              <img class="img-button" src="../icons/Pencil.png" alt="" /> Sửa
            </button>
          </div>

          <div v-else-if="isAdmin && pbhdsdItem.id && !hdsdcItem.id && !pbhdsdcItem.id
            ">
            <span class="space"></span>
            <button @click="showFormEditPbHdsd" class="btn-ua">
              <img class="img-button" src="../icons/Pencil.png" alt="" /> Sửa
            </button>
          </div>
          <div>
            <span class="space"></span>
            <v-btn @click="share">
              <img class="btn-share" src="../icons/share.png" alt="" />
            </v-btn>
          </div>
        </div>
      </div>

      <!-- Khung main -->
      <div v-if="dvsItemsVisible && !dvsItem.id" class="khung-main mt-3 content-height">
        <h3 class="text-center mt-3">Danh sách các dịch vụ số</h3>
        <div class="ml-5 font-text khung-dl mb-2">
          <div>
            <div v-for="(item, index) in dvsItems" :key="index" class="list-item-ct">
              <p @click="visibleDvs(item)" class="list-item-text">
                {{ item.title }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Khung DVS -->
      <div v-if="(dvsItem.id && !phItem.id && !hdsdcItem.id) || dvsItemVisible" class="mt-3 content-height">
        <div class="khung-content">
          <div class="div-h3 mt-2">
            <div class="btn-like2 ml-2"></div>
            <h3 class="text-center">
              {{ dvsItem.title }}
            </h3>
            <button v-if="account.MaNguoiDung" @click="checkLikeDvs" class="btn-like mr-2">
              <i v-if="!likeDvs" class="fa-regular fa-heart"></i>
              <i v-if="likeDvs" class="fa-solid fa-heart fa-beat-fade" style="color: #ff2600"></i>
              Yêu thích
            </button>

            <div v-else class="btn-like mr-2"></div>
          </div>

          <div class="ml-5 font-text khung-dl mt-2 mb-2">
            <div>
              <div v-for="(item, index) in dvsItem.hdsdChungItems" :key="index" class="list-item-ct">
                <h4 @click="visibleHdsdc(item)" class="list-item-text">
                  {{ item.title }}
                </h4>
              </div>
            </div>
            <hr />
            <div>
              <h4 class="ml-2">Danh sách các phân hệ chức năng</h4>
              <div v-for="(item, index) in dvsItem.phItems" :key="index" class="list-item-ct">
                <p @click="visiblePh(item)" class="list-item-text">
                  {{ item.title }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Khung comment DVS -->
        <div class="khung-comment mt-2 font-text">
          <div class="ml-5 khung-bl mr-5">
            <div v-if="dsBinhLuanDvs.length > 0">
              <div v-for="item in dsBinhLuanDvs">
                <div class="div-bl">
                  <img class="atv-comment mr-2" :src="serverUrl + item.HINHANH" alt="" />
                  <p class="p-bl">
                    <b class="mr-2">{{ item.TENHIENTHI }}:</b>
                    {{ item.NOIDUNG }}
                  </p>
                </div>
                <p class="p-bl font-bl mg-bl">
                  {{ item.THOIGIANBINHLUAN }}
                  <v-btn class="ml-2 bt-traloi" v-if="account.MaNguoiDung" type="button" @click="traLoiBinhLuan(item)">Trả
                    lời</v-btn>
                </p>
                <div v-for="element in item.TraLoiBL" class="mg-bl">
                  <div class="div-bl">
                    <img class="atv-comment mr-2" :src="serverUrl + element.HINHANH" alt="" />
                    <p class="p-bl">
                      <b class="mr-2">{{ element.TENHIENTHI }}:</b>
                      {{ element.NOIDUNG }}
                    </p>
                  </div>

                  <p class="p-bl font-bl mg-bl">
                    {{ element.THOIGIANBINHLUAN }}
                    <v-btn class="ml-2 bt-traloi" v-if="account.MaNguoiDung" type="button"
                      @click="traLoiBinhLuanCuaBinhLuan(item, element)">Trả lời</v-btn>
                  </p>
                </div>
              </div>
            </div>

            <div style="text-align: center" class="mt-3 mb-3" v-else>
              <p>Không có bình luận nào!</p>
            </div>
          </div>
          <div class="ml-5 mr-5 khung-sent" v-if="binhLuanVisible && account.MaNguoiDung">
            <Form ref="form" @submit.prevent>
              <div class="form-group form-cmt">
                <img class="atv-comment" :src="serverUrl + this.accountInfo.HinhAnh" alt="" />
                <div class="input-cmt">
                  <Field type="text" class="form-control" placeholder="Nhập bình luận" v-model="comment"
                    name="tendangnhap" @keyup.enter="sentCommentDvs" />
                </div>
                <div>
                  <v-btn class="image-button-cmt" @click="sentCommentDvs">
                    <i class="fa-solid fa-paper-plane"></i>
                  </v-btn>
                </div>
              </div>
            </Form>
          </div>
          <div class="ml-5 mr-5 khung-sent" v-if="!binhLuanVisible && account.MaNguoiDung">
            <Form ref="form" @submit.prevent>
              <div>
                <p>
                  Đang trả lời <b>{{ itemReplyBinhLuan.TENHIENTHI }}</b> -
                  <v-btn class="bt-traloi" type="button" @click="huyTraLoi">Hủy</v-btn>
                </p>
              </div>
              <div class="form-group form-cmt">
                <img class="atv-comment" :src="serverUrl + this.accountInfo.HinhAnh" alt="" />
                <div class="input-cmt">
                  <Field type="text" class="form-control" placeholder="Nhập bình luận" v-model="comment"
                    name="tendangnhap" @keyup.enter="traLoiCommentDvs" />
                </div>
                <div>
                  <v-btn class="image-button-cmt" @click="traLoiCommentDvs">
                    <i class="fa-solid fa-paper-plane"></i>
                  </v-btn>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <!-- Khung HDSDC -->
      <div v-if="(hdsdcItem.id && !pbhdsdcItem.id) || hdsdcItemVisible" class="mt-3 content-height">
        <div class="khung-content">
          <div class="div-h3 mt-2">
            <div class="btn-like2 ml-2"></div>
            <h3 class="text-center">
              {{ hdsdcItem.title }}
            </h3>
            <button v-if="account.MaNguoiDung" @click="checkLikeHdsdc" class="btn-like mr-2">
              <i v-if="!likeHdsdc" class="fa-regular fa-heart"></i>
              <i v-if="likeHdsdc" class="fa-solid fa-heart fa-beat-fade" style="color: #ff2600"></i>
              Yêu thích
            </button>
            <div v-else class="btn-like mr-2"></div>
          </div>

          <div class="ml-5 font-text khung-dl mt-2 mb-2">
            <div>
              <h4 class="ml-2">
                Danh sách các phiên bản hướng dẫn sử dụng chung
              </h4>
              <div v-for="(item, index) in hdsdcItem.pbhdsdChungItems" :key="index" class="list-item-ct">
                <p @click="visiblePbHdsdc(item)" class="list-item-text">
                  {{ item.title }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- Khung comment HDSDC -->
        <div class="khung-comment mt-2 font-text">
          <div class="ml-5 khung-bl mr-5">
            <div v-if="dsBinhLuanHdsdc.length > 0">
              <div v-for="item in dsBinhLuanHdsdc">
                <div class="div-bl">
                  <img class="atv-comment mr-2" :src="serverUrl + item.HINHANH" alt="" />
                  <p class="p-bl">
                    <b class="mr-2">{{ item.TENHIENTHI }}:</b>
                    {{ item.NOIDUNG }}
                  </p>
                </div>

                <p class="p-bl font-bl mg-bl">
                  {{ item.THOIGIANBINHLUAN }}
                  <v-btn class="ml-2 bt-traloi" v-if="account.MaNguoiDung" type="button" @click="traLoiBinhLuan(item)">Trả
                    lời</v-btn>
                </p>
                <div v-for="element in item.TraLoiBL" class="mg-bl">
                  <div class="div-bl">
                    <img class="atv-comment mr-2" :src="serverUrl + element.HINHANH" alt="" />
                    <p class="p-bl">
                      <b class="mr-2">{{ element.TENHIENTHI }}:</b>
                      {{ element.NOIDUNG }}
                    </p>
                  </div>

                  <p class="p-bl font-bl mg-bl">
                    {{ element.THOIGIANBINHLUAN }}
                    <v-btn class="ml-2 bt-traloi" v-if="account.MaNguoiDung" type="button"
                      @click="traLoiBinhLuanCuaBinhLuan(item, element)">Trả lời</v-btn>
                  </p>
                </div>
              </div>
            </div>

            <div style="text-align: center" class="mt-3 mb-3" v-else>
              <p>Không có bình luận nào!</p>
            </div>
          </div>
          <div class="ml-5 mr-5 khung-sent" v-if="binhLuanVisible && account.MaNguoiDung">
            <Form ref="form" @submit.prevent>
              <div class="form-group form-cmt">
                <img class="atv-comment" :src="serverUrl + this.accountInfo.HinhAnh" alt="" />
                <div class="input-cmt">
                  <Field type="text" class="form-control" placeholder="Nhập bình luận" v-model="comment"
                    name="tendangnhap" @keyup.enter="sentCommentHdsdc" />
                </div>
                <div>
                  <v-btn class="image-button-cmt" @click="sentCommentHdsdc">
                    <i class="fa-solid fa-paper-plane"></i>
                  </v-btn>
                </div>
              </div>
            </Form>
          </div>
          <div class="ml-5 mr-5 khung-sent" v-if="!binhLuanVisible && account.MaNguoiDung">
            <Form ref="form" @submit.prevent>
              <div>
                <p>
                  Đang trả lời <b>{{ itemReplyBinhLuan.TENHIENTHI }}</b> -
                  <v-btn class="bt-traloi" type="button" @click="huyTraLoi">Hủy</v-btn>
                </p>
              </div>
              <div class="form-group form-cmt">
                <img class="atv-comment" :src="serverUrl + this.accountInfo.HinhAnh" alt="" />
                <div class="input-cmt">
                  <Field type="text" class="form-control" placeholder="Nhập bình luận" v-model="comment"
                    name="tendangnhap" @keyup.enter="traLoiCommentHdsdc" />
                </div>
                <div>
                  <v-btn class="image-button-cmt" @click="traLoiCommentHdsdc">
                    <i class="fa-solid fa-paper-plane"></i>
                  </v-btn>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <!-- Khung PBHDSDC -->
      <div v-if="pbhdsdcItem.id || pbhdsdcItemVisible" class="mt-3 content-height">
        <div class="khung-content">
          <div class="div-h3 mt-2">
            <div class="btn-like2 ml-2"></div>
            <h3 class="text-center">
              {{ pbhdsdcItem.title }}
            </h3>
            <button v-if="account.MaNguoiDung" @click="checkLikePbHdsdc" class="btn-like mr-2">
              <i v-if="!likePbHdsdc" class="fa-regular fa-heart"></i>
              <i v-if="likePbHdsdc" class="fa-solid fa-heart fa-beat-fade" style="color: #ff2600"></i>
              Yêu thích
            </button>
            <div v-else class="btn-like mr-2"></div>
          </div>

          <div class="font-text khung-dl mt-2 mb-2">
            <div :key="index" class="pbhdsd-div">
              <table class="table-main">
                <tbody>
                  <tr>
                    <td class="td-pd1"><b>Tiêu đề:</b></td>
                    <td class="td-pd2">{{ pbhdsdcItem.title }}</td>
                  </tr>
                  <tr>
                    <td class="td-pd1"><b>Thời gian tạo:</b></td>
                    <td class="td-pd2">{{ pbhdsdcItem.time }}</td>
                  </tr>
                  <tr>
                    <td class="td-pd1"><b>Người tạo:</b></td>
                    <td class="td-pd2">{{ pbhdsdcItem.user }}</td>
                  </tr>
                  <tr>
                    <td class="td-pd1"><b>File đính kèm:</b></td>
                    <td class="td-pd2">
                      <v-btn class="linkDowload" href="" @click="downloadFile(pbhdsdcItem.url)">{{ pbhdsdcItem.url
                      }}</v-btn>
                    </td>
                  </tr>
                  <tr>
                    <td class="td-pd1"><b>Mô tả:</b></td>
                    <td class="td-pd2">{{ pbhdsdcItem.describe }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Khung comment PbHDSDC -->
        <div class="khung-comment mt-2 font-text">
          <div class="ml-5 khung-bl mr-5">
            <div v-if="dsBinhLuanPbHdsdc.length > 0">
              <div v-for="item in dsBinhLuanPbHdsdc">
                <div class="div-bl">
                  <img class="atv-comment mr-2" :src="serverUrl + item.HINHANH" alt="" />
                  <p class="p-bl">
                    <b class="mr-2">{{ item.TENHIENTHI }}:</b>
                    {{ item.NOIDUNG }}
                  </p>
                </div>

                <p class="p-bl font-bl mg-bl">
                  {{ item.THOIGIANBINHLUAN }}
                  <v-btn class="ml-2 bt-traloi" v-if="account.MaNguoiDung" type="button" @click="traLoiBinhLuan(item)">Trả
                    lời</v-btn>
                </p>
                <div v-for="element in item.TraLoiBL" class="mg-bl">
                  <div class="div-bl">
                    <img class="atv-comment mr-2" :src="serverUrl + element.HINHANH" alt="" />
                    <p class="p-bl">
                      <b class="mr-2">{{ element.TENHIENTHI }}:</b>
                      {{ element.NOIDUNG }}
                    </p>
                  </div>

                  <p class="p-bl font-bl mg-bl">
                    {{ element.THOIGIANBINHLUAN }}
                    <v-btn class="ml-2 bt-traloi" v-if="account.MaNguoiDung" type="button"
                      @click="traLoiBinhLuanCuaBinhLuan(item, element)">Trả lời</v-btn>
                  </p>
                </div>
              </div>
            </div>

            <div style="text-align: center" class="mt-3 mb-3" v-else>
              <p>Không có bình luận nào!</p>
            </div>
          </div>
          <div class="ml-5 mr-5 khung-sent" v-if="binhLuanVisible && account.MaNguoiDung">
            <Form ref="form" @submit.prevent>
              <div class="form-group form-cmt">
                <img class="atv-comment" :src="serverUrl + this.accountInfo.HinhAnh" alt="" />
                <div class="input-cmt">
                  <Field type="text" class="form-control" placeholder="Nhập bình luận" v-model="comment"
                    name="tendangnhap" @keyup.enter="sentCommentPbHdsdc" />
                </div>
                <div>
                  <v-btn class="image-button-cmt" @click="sentCommentPbHdsdc">
                    <i class="fa-solid fa-paper-plane"></i>
                  </v-btn>
                </div>
              </div>
            </Form>
          </div>
          <div class="ml-5 mr-5 khung-sent" v-if="!binhLuanVisible && account.MaNguoiDung">
            <Form ref="form" @submit.prevent>
              <div>
                <p>
                  Đang trả lời <b>{{ itemReplyBinhLuan.TENHIENTHI }}</b> -
                  <v-btn class="bt-traloi" type="button" @click="huyTraLoi">Hủy</v-btn>
                </p>
              </div>
              <div class="form-group form-cmt">
                <img class="atv-comment" :src="serverUrl + this.accountInfo.HinhAnh" alt="" />
                <div class="input-cmt">
                  <Field type="text" class="form-control" placeholder="Nhập bình luận" v-model="comment"
                    name="tendangnhap" @keyup.enter="traLoiCommentPbHdsdc" />
                </div>
                <div>
                  <v-btn class="image-button-cmt" @click="traLoiCommentPbHdsdc">
                    <i class="fa-solid fa-paper-plane"></i>
                  </v-btn>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <!-- Khung PH -->
      <div v-if="(phItem.id && !cnItem.id) || phItemVisible" class="mt-3 content-height">
        <div class="khung-content">
          <div class="div-h3 mt-2">
            <div class="btn-like2 ml-2"></div>
            <h3 class="text-center">
              {{ phItem.title }}
            </h3>
            <button v-if="account.MaNguoiDung" @click="checkLikePh" class="btn-like mr-2">
              <i v-if="!likePh" class="fa-regular fa-heart"></i>
              <i v-if="likePh" class="fa-solid fa-heart fa-beat-fade" style="color: #ff2600"></i>
              Yêu thích
            </button>
            <div v-else class="btn-like mr-2"></div>
          </div>

          <div class="ml-5 font-text khung-dl mt-2 mb-2">
            <div>
              <h4 class="ml-2">Danh sách các chức năng</h4>
              <div v-for="(item, index) in phItem.cnItems" :key="index" class="list-item-ct">
                <p @click="visibleCn(item)" class="list-item-text">
                  {{ item.title }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- Khung comment Ph -->
        <div v-if="(phItem.id && !cnItem.id) || phItemVisible" class="khung-comment mt-2 font-text">
          <div class="ml-5 khung-bl mr-5">
            <div v-if="dsBinhLuanPh.length > 0">
              <div v-for="item in dsBinhLuanPh">
                <div class="div-bl">
                  <img class="atv-comment mr-2" :src="serverUrl + item.HINHANH" alt="" />
                  <p class="p-bl">
                    <b class="mr-2">{{ item.TENHIENTHI }}:</b>
                    {{ item.NOIDUNG }}
                  </p>
                </div>

                <p class="p-bl font-bl mg-bl">
                  {{ item.THOIGIANBINHLUAN }}
                  <v-btn class="ml-2 bt-traloi" v-if="account.MaNguoiDung" type="button" @click="traLoiBinhLuan(item)">Trả
                    lời</v-btn>
                </p>
                <div v-for="element in item.TraLoiBL" class="mg-bl">
                  <div class="div-bl">
                    <img class="atv-comment mr-2" :src="serverUrl + element.HINHANH" alt="" />
                    <p class="p-bl">
                      <b class="mr-2">{{ element.TENHIENTHI }}:</b>
                      {{ element.NOIDUNG }}
                    </p>
                  </div>

                  <p class="p-bl font-bl mg-bl">
                    {{ element.THOIGIANBINHLUAN }}
                    <v-btn class="ml-2 bt-traloi" v-if="account.MaNguoiDung" type="button"
                      @click="traLoiBinhLuanCuaBinhLuan(item, element)">Trả lời</v-btn>
                  </p>
                </div>
              </div>
            </div>
            <div style="text-align: center" class="mt-3 mb-3" v-else>
              <p>Không có bình luận nào!</p>
            </div>
          </div>
          <div class="ml-5 mr-5 khung-sent" v-if="binhLuanVisible && account.MaNguoiDung">
            <Form ref="form" @submit.prevent>
              <div class="form-group form-cmt">
                <img class="atv-comment" :src="serverUrl + this.accountInfo.HinhAnh" alt="" />
                <div class="input-cmt">
                  <Field type="text" class="form-control" placeholder="Nhập bình luận" v-model="comment"
                    name="tendangnhap" @keyup.enter="sentCommentPHCN" />
                </div>
                <div>
                  <v-btn class="image-button-cmt" @click="sentCommentPHCN">
                    <i class="fa-solid fa-paper-plane"></i>
                  </v-btn>
                </div>
              </div>
            </Form>
          </div>
          <div class="ml-5 mr-5 khung-sent" v-if="!binhLuanVisible && account.MaNguoiDung">
            <Form ref="form" @submit.prevent>
              <div>
                <p>
                  Đang trả lời <b>{{ itemReplyBinhLuan.TENHIENTHI }}</b> -
                  <v-btn class="bt-traloi" type="button" @click="huyTraLoi">Hủy</v-btn>
                </p>
              </div>
              <div class="form-group form-cmt">
                <img class="atv-comment" :src="serverUrl + this.accountInfo.HinhAnh" alt="" />
                <div class="input-cmt">
                  <Field type="text" class="form-control" placeholder="Nhập bình luận" v-model="comment"
                    name="tendangnhap" @keyup.enter="traLoiCommentPHCN" />
                </div>
                <div>
                  <v-btn class="image-button-cmt" @click="traLoiCommentPHCN">
                    <i class="fa-solid fa-paper-plane"></i>
                  </v-btn>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <!-- Khung CN -->
      <div v-if="(cnItem.id && !hdsdItem.id) || cnItemVisible" class="mt-3 content-height">
        <div class="khung-content-cn">
          <div class="div-h3 mt-2">
            <div class="btn-like2 ml-2"></div>
            <h3 class="text-center">
              {{ cnItem.title }}
            </h3>
            <button v-if="account.MaNguoiDung" @click="checkLikeCn" class="btn-like mr-2">
              <i v-if="!likeCn" class="fa-regular fa-heart"></i>
              <i v-if="likeCn" class="fa-solid fa-heart fa-beat-fade" style="color: #ff2600"></i>
              Yêu thích
            </button>
            <div v-else class="btn-like mr-2"></div>
          </div>

          <div class="loai-flex">
            <div v-for="(item, index) in cnItem.LoaiItems" :key="index">
              <v-btn :class="{ 'hover-loai': lItem.id === item.id }" class="btn-l btn" @click="visibleLoai(item)">{{
                item.title }}</v-btn>
            </div>
          </div>

          <div class="khung-ct-cn">
            <div class="ml-5 khung-dl mt-2 mb-2">
              <h4 class="ml-2 mt-3 mb-3">Danh sách các hướng dẫn sử dụng</h4>
              <div v-for="(itemHdsd, index) in lItem.HDSDItems" :key="index" class="list-item-ct">
                <p @click="visibleHdsd(itemHdsd)" class="list-item-text">
                  {{ itemHdsd.title }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- Khung comment Cn -->
        <div v-if="(cnItem.id && !hdsdItem.id) || cnItemVisible" class="khung-comment mt-2 font-text">
          <div class="ml-5 khung-bl mr-5">
            <div v-if="dsBinhLuanCn.length > 0">
              <div v-for="item in dsBinhLuanCn">
                <div class="div-bl">
                  <img class="atv-comment mr-2" :src="serverUrl + item.HINHANH" alt="" />
                  <p class="p-bl">
                    <b class="mr-2">{{ item.TENHIENTHI }}:</b>
                    {{ item.NOIDUNG }}
                  </p>
                </div>

                <p class="p-bl font-bl mg-bl">
                  {{ item.THOIGIANBINHLUAN }}
                  <v-btn class="ml-2 bt-traloi" v-if="account.MaNguoiDung" type="button" @click="traLoiBinhLuan(item)">Trả
                    lời</v-btn>
                </p>
                <div v-for="element in item.TraLoiBL" class="mg-bl">
                  <div class="div-bl">
                    <img class="atv-comment mr-2" :src="serverUrl + element.HINHANH" alt="" />
                    <p class="p-bl">
                      <b class="mr-2">{{ element.TENHIENTHI }}:</b>
                      {{ element.NOIDUNG }}
                    </p>
                  </div>

                  <p class="p-bl font-bl mg-bl">
                    {{ element.THOIGIANBINHLUAN }}
                    <v-btn class="ml-2 bt-traloi" v-if="account.MaNguoiDung" type="button"
                      @click="traLoiBinhLuanCuaBinhLuan(item, element)">Trả lời</v-btn>
                  </p>
                </div>
              </div>
            </div>

            <div style="text-align: center" class="mt-3 mb-3" v-else>
              <p>Không có bình luận nào!</p>
            </div>
          </div>
          <div class="ml-5 mr-5 khung-sent" v-if="binhLuanVisible && account.MaNguoiDung">
            <Form ref="form" @submit.prevent>
              <div class="form-group form-cmt">
                <img class="atv-comment" :src="serverUrl + this.accountInfo.HinhAnh" alt="" />
                <div class="input-cmt">
                  <Field type="text" class="form-control" placeholder="Nhập bình luận" v-model="comment"
                    name="tendangnhap" @keyup.enter="sentCommentChucNang" />
                </div>
                <div>
                  <v-btn class="image-button-cmt" @click="sentCommentChucNang">
                    <i class="fa-solid fa-paper-plane"></i>
                  </v-btn>
                </div>
              </div>
            </Form>
          </div>
          <div class="ml-5 mr-5 khung-sent" v-if="!binhLuanVisible && account.MaNguoiDung">
            <Form ref="form" @submit.prevent>
              <div>
                <p>
                  Đang trả lời <b>{{ itemReplyBinhLuan.TENHIENTHI }}</b> -
                  <v-btn class="bt-traloi" type="button" @click="huyTraLoi">Hủy</v-btn>
                </p>
              </div>
              <div class="form-group form-cmt">
                <img class="atv-comment" :src="serverUrl + this.accountInfo.HinhAnh" alt="" />
                <div class="input-cmt">
                  <Field type="text" class="form-control" placeholder="Nhập bình luận" v-model="comment"
                    name="tendangnhap" @keyup.enter="traLoiCommentChucNang" />
                </div>
                <div>
                  <v-btn class="image-button-cmt" @click="traLoiCommentChucNang">
                    <i class="fa-solid fa-paper-plane"></i>
                  </v-btn>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <!-- Khung HDSD -->
      <div v-if="(hdsdItem.id && !pbhdsdItem.id) || hdsdItemVisible" class="mt-3 content-height">
        <div class="khung-content">
          <div class="div-h3 mt-2">
            <div class="btn-like2 ml-2"></div>
            <h3 class="text-center">
              {{ hdsdItem.title }}
            </h3>
            <button v-if="account.MaNguoiDung" @click="checkLikeHdsd" class="btn-like mr-2">
              <i v-if="!likeHdsd" class="fa-regular fa-heart"></i>
              <i v-if="likeHdsd" class="fa-solid fa-heart fa-beat-fade" style="color: #ff2600"></i>
              Yêu thích
            </button>
            <div v-else class="btn-like mr-2"></div>
          </div>

          <div class="ml-5 font-text khung-dl mt-2 mb-2">
            <div>
              <h4 class="ml-2">Danh sách các phiên bản hướng dẫn sử dụng</h4>
              <div v-for="(item, index) in hdsdItem.PbHDSDItems" :key="index" class="list-item-ct">
                <p @click="visiblePbHdsd(item)" class="list-item-text">
                  {{ item.title }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Khung comment HDSDC -->
        <div v-if="(hdsdItem.id && !pbhdsdItem.id) || hdsdItemVisible" class="khung-comment mt-2 font-text">
          <div class="ml-5 khung-bl mr-5">
            <div v-if="dsBinhLuanHdsd.length > 0">
              <div v-for="item in dsBinhLuanHdsd">
                <div class="div-bl">
                  <img class="atv-comment mr-2" :src="serverUrl + item.HINHANH" alt="" />
                  <p class="p-bl">
                    <b class="mr-2">{{ item.TENHIENTHI }}:</b>
                    {{ item.NOIDUNG }}
                  </p>
                </div>

                <p class="p-bl font-bl mg-bl">
                  {{ item.THOIGIANBINHLUAN }}
                  <v-btn class="ml-2 bt-traloi" v-if="account.MaNguoiDung" type="button" @click="traLoiBinhLuan(item)">Trả
                    lời</v-btn>
                </p>
                <div v-for="element in item.TraLoiBL" class="mg-bl">
                  <div class="div-bl">
                    <img class="atv-comment mr-2" :src="serverUrl + element.HINHANH" alt="" />
                    <p class="p-bl">
                      <b class="mr-2">{{ element.TENHIENTHI }}:</b>
                      {{ element.NOIDUNG }}
                    </p>
                  </div>

                  <p class="p-bl font-bl mg-bl">
                    {{ element.THOIGIANBINHLUAN }}
                    <v-btn class="ml-2 bt-traloi" v-if="account.MaNguoiDung" type="button"
                      @click="traLoiBinhLuanCuaBinhLuan(item, element)">Trả lời</v-btn>
                  </p>
                </div>
              </div>
            </div>

            <div style="text-align: center" class="mt-3 mb-3" v-else>
              <p>Không có bình luận nào!</p>
            </div>
          </div>
          <div class="ml-5 mr-5 khung-sent" v-if="binhLuanVisible && account.MaNguoiDung">
            <Form ref="form" @submit.prevent>
              <div class="form-group form-cmt">
                <img class="atv-comment" :src="serverUrl + this.accountInfo.HinhAnh" alt="" />
                <div class="input-cmt">
                  <Field type="text" class="form-control" placeholder="Nhập bình luận" v-model="comment"
                    name="tendangnhap" @keyup.enter="sentCommentHdsd" />
                </div>
                <div>
                  <v-btn class="image-button-cmt" @click="sentCommentHdsd">
                    <i class="fa-solid fa-paper-plane"></i>
                  </v-btn>
                </div>
              </div>
            </Form>
          </div>
          <div class="ml-5 mr-5 khung-sent" v-if="!binhLuanVisible && account.MaNguoiDung">
            <Form ref="form" @submit.prevent>
              <div>
                <p>
                  Đang trả lời <b>{{ itemReplyBinhLuan.TENHIENTHI }}</b> -
                  <v-btn class="bt-traloi" type="button" @click="huyTraLoi">Hủy</v-btn>
                </p>
              </div>
              <div class="form-group form-cmt">
                <img class="atv-comment" :src="serverUrl + this.accountInfo.HinhAnh" alt="" />
                <div class="input-cmt">
                  <Field type="text" class="form-control" placeholder="Nhập bình luận" v-model="comment"
                    name="tendangnhap" @keyup.enter="traLoiCommentHdsd" />
                </div>
                <div>
                  <v-btn class="image-button-cmt" @click="traLoiCommentHdsd">
                    <i class="fa-solid fa-paper-plane"></i>
                  </v-btn>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <!-- Khung PBHDSD -->
      <div v-if="pbhdsdItem.id || pbhdsdItemVisible" class="mt-3 content-height">
        <div class="khung-content">
          <div class="div-h3 mt-2">
            <div class="btn-like2 ml-2"></div>
            <h3 class="text-center">
              {{ pbhdsdItem.title }}
            </h3>
            <button v-if="account.MaNguoiDung" @click="checkLikePbHdsd" class="btn-like mr-2">
              <i v-if="!likePbHdsd" class="fa-regular fa-heart"></i>
              <i v-if="likePbHdsd" class="fa-solid fa-heart fa-beat-fade" style="color: #ff2600"></i>
              Yêu thích
            </button>
            <div v-else class="btn-like mr-2"></div>
          </div>

          <div class="font-text khung-dl mt-2 mb-2">
            <div :key="index" class="pbhdsd-div">
              <table class="table-main">
                <tbody>
                  <tr>
                    <td class="td-pd1"><b>Tiêu đề:</b></td>
                    <td class="td-pd2">{{ pbhdsdItem.title }}</td>
                  </tr>
                  <tr>
                    <td class="td-pd1"><b>Thời gian tạo:</b></td>
                    <td class="td-pd2">{{ pbhdsdItem.time }}</td>
                  </tr>
                  <tr>
                    <td class="td-pd1"><b>Người tạo:</b></td>
                    <td class="td-pd2">{{ pbhdsdItem.user }}</td>
                  </tr>
                  <tr>
                    <td class="td-pd1"><b>File đính kèm:</b></td>
                    <td class="td-pd2">
                      <v-btn class="linkDowload" href="" @click="downloadFile(pbhdsdItem.url)">{{ pbhdsdItem.url
                      }}</v-btn>
                    </td>
                  </tr>
                  <tr>
                    <td class="td-pd1"><b>Mô tả:</b></td>
                    <td class="td-pd2">{{ pbhdsdItem.describe }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- Khung comment PbHDSDC -->
        <div v-if="pbhdsdItem.id || pbhdsdItemVisible" class="khung-comment mt-2 font-text">
          <div class="ml-5 khung-bl mr-5">
            <div v-if="dsBinhLuanPbHdsd.length > 0">
              <div v-for="item in dsBinhLuanPbHdsd">
                <div class="div-bl">
                  <img class="atv-comment mr-2" :src="serverUrl + item.HINHANH" alt="" />
                  <p class="p-bl">
                    <b class="mr-2">{{ item.TENHIENTHI }}:</b>
                    {{ item.NOIDUNG }}
                  </p>
                </div>

                <p class="p-bl font-bl mg-bl">
                  {{ item.THOIGIANBINHLUAN }}
                  <v-btn class="ml-2 bt-traloi" v-if="account.MaNguoiDung" type="button" @click="traLoiBinhLuan(item)">Trả
                    lời</v-btn>
                </p>
                <div v-for="element in item.TraLoiBL" class="mg-bl">
                  <div class="div-bl">
                    <img class="atv-comment mr-2" :src="serverUrl + element.HINHANH" alt="" />
                    <p class="p-bl">
                      <b class="mr-2">{{ element.TENHIENTHI }}:</b>
                      {{ element.NOIDUNG }}
                    </p>
                  </div>

                  <p class="p-bl font-bl mg-bl">
                    {{ element.THOIGIANBINHLUAN }}
                    <v-btn class="ml-2 bt-traloi" v-if="account.MaNguoiDung" type="button"
                      @click="traLoiBinhLuanCuaBinhLuan(item, element)">Trả lời</v-btn>
                  </p>
                </div>
              </div>
            </div>

            <div style="text-align: center" class="mt-3 mb-3" v-else>
              <p>Không có bình luận nào!</p>
            </div>
          </div>
          <div class="ml-5 mr-5 khung-sent" v-if="binhLuanVisible && account.MaNguoiDung">
            <Form ref="form" @submit.prevent>
              <div class="form-group form-cmt">
                <img class="atv-comment" :src="serverUrl + this.accountInfo.HinhAnh" alt="" />
                <div class="input-cmt">
                  <Field type="text" class="form-control" placeholder="Nhập bình luận" v-model="comment"
                    name="tendangnhap" @keyup.enter="sentCommentPbHdsd" />
                </div>
                <div>
                  <v-btn class="image-button-cmt" @click="sentCommentPbHdsd">
                    <i class="fa-solid fa-paper-plane"></i>
                  </v-btn>
                </div>
              </div>
            </Form>
          </div>
          <div class="ml-5 mr-5 khung-sent" v-if="!binhLuanVisible && account.MaNguoiDung">
            <Form ref="form" @submit.prevent>
              <div>
                <p>
                  Đang trả lời <b>{{ itemReplyBinhLuan.TENHIENTHI }}</b> -
                  <v-btn class="bt-traloi" type="button" @click="huyTraLoi">Hủy</v-btn>
                </p>
              </div>
              <div class="form-group form-cmt">
                <img class="atv-comment" :src="serverUrl + this.accountInfo.HinhAnh" alt="" />
                <div class="input-cmt">
                  <Field type="text" class="form-control" placeholder="Nhập bình luận" v-model="comment"
                    name="tendangnhap" @keyup.enter="traLoiCommentPbHdsd" />
                </div>
                <div>
                  <v-btn class="image-button-cmt" @click="traLoiCommentPbHdsd">
                    <i class="fa-solid fa-paper-plane"></i>
                  </v-btn>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>

    <!-- Frame 2 chọn thao tác thêm DVS thêm ph-->
    <div v-if="addVisible && isAdmin" class="pd-content">
      <div class="title-content">
        <button @click="showFormHome" class="btn-img">
          <img class="img-width" src="../icons/Mt-back.png" alt="" />
        </button>
        <h3 class="h3-center">CHỌN THAO TÁC MUỐN THỰC HIỆN</h3>
      </div>
      <div class="radio-group text-f mt-4 mb-4">
        <div class="left-label">
          <input class="mr-2" type="radio" id="radio1" name="radio-group" value="dvs" v-model="selectedOption" />
          <label for="radio1">Thêm dịch vụ số</label>
        </div>

        <div class="right-label">
          <input class="mr-2" type="radio" id="radio2" name="radio-group" value="phcn" v-model="selectedOption" />
          <label for="radio2">Thêm phân hệ chức năng</label>
        </div>
      </div>
      <hr />

      <div class="khung-bogoc mt-4">
        <div v-if="dvsVisible" class="add-update">
          <h3 class="h3-center mt-3 mb-5">Thêm dịch vụ số</h3>
          <Form ref="formAddDvs" :validation-schema="FormSchemaAddDvs">
            <div class="form-group mb-5 input-container">
              <label for="tendvs" class="text-f20b mt-5">Nhập tên dịch vụ số</label>
              <Field type="text" class="form-control text-f20 width-form-bd mb-1" placeholder="Nhập tên dịch vụ số"
                v-model="tendvs" name="tendvs" />
              <ErrorMessage name="tendvs" class="error-message-content" />
            </div>

            <div class="canhgiua-ct">
              <v-btn @click="onThemDichVuSo" class="btn-add btn"> LƯU </v-btn>
            </div>
          </Form>
        </div>

        <div v-if="phVisible" class="add-update">
          <h3 class="h3-center mt-3 mb-5">Thêm phân hệ chức năng</h3>
          <Form ref="formAddPh" :validation-schema="FormSchemaAddPh">
            <div class="form-group mb-5 input-container">
              <label for="tenph" class="text-f20b mt-5">Nhập tên phân hệ</label>
              <Field type="text" class="form-control text-f20 width-form-bd mb-1" placeholder="Nhập tên phân hệ"
                v-model="tenph" name="tenph" />
              <ErrorMessage name="tenph" class="error-message-content" />
            </div>

            <div class="canhgiua-ct">
              <v-btn :disabled="isTrue" @click="onThemPhanHeChucNang" class="btn-add btn">
                LƯU
              </v-btn>
            </div>
          </Form>
        </div>
      </div>
    </div>

    <!-- Frame sửa DVS ph-->
    <div v-if="editVisible && isAdmin" class="pd-content">
      <div class="title-content">
        <button @click="showFormHome" class="btn-img">
          <img class="img-width" src="../icons/Mt-back.png" alt="" />
        </button>
        <h3 class="h3-center">CHỌN THAO TÁC MUỐN THỰC HIỆN</h3>
      </div>
      <div class="radio-group text-f mt-4 mb-4">
        <div class="left-label">
          <input class="mr-2" type="radio" id="radio1" name="radio-group" value="sdvs" v-model="selectedOptionSua" />
          <label for="radio1">Sửa dịch vụ số</label>
        </div>

        <div class="center-label">
          <input class="mr-2" type="radio" id="radio2" name="radio-group" value="sphcn" v-model="selectedOptionSua" />
          <label for="radio2">Sửa phân hệ chức năng</label>
        </div>
      </div>
      <hr />
      <div class="khung-bogoc mt-4">
        <!-- Sửa dịch vụ số -->
        <div v-if="sdvsVisible" class="add-update">
          <h3 class="h3-center mt-3 mb-5">Sửa dịch vụ số</h3>
          <Form ref="formUpdateDvs" :validation-schema="FormSchemaUpdateDvs">
            <div class="form-group">
              <label for="tendvs" class="text-f20b">Chọn dịch vụ số</label>
              <select name="tendvs" class="form-control text-f20 width-form-bd mb-2" v-model="optionDvs">
                <option :value="-1">Chọn dịch vụ số</option>
                <option v-for="option in optionsDvs" :value="option.MADV">
                  {{ truncateText(option.TENDV, 60) }}
                </option>
              </select>
            </div>

            <div class="form-group input-container mb-5">
              <label for="tendvsmoi" class="text-f20b">Nhập tên dịch vụ số mới</label>
              <Field type="text" class="form-control text-f20 width-form-bd mb-1" placeholder="Nhập tên dịch vụ số mới"
                v-model="tendvsmoi" name="tendvsmoi" />
              <ErrorMessage name="tendvsmoi" class="error-message-content" />
            </div>

            <div class="canhgiua-ct">
              <v-btn :disabled="isTrue" @click="onSuaDichVuSo" class="btn-add btn">
                SỬA
              </v-btn>
            </div>
          </Form>
        </div>

        <!-- Sửa phân hệ chức năng -->
        <div v-if="sphVisible" class="add-update">
          <h3 class="h3-center mt-3 mb-5">Sửa phân hệ chức năng</h3>
          <Form ref="formUpdatePh" :validation-schema="FormSchemaUpdatePh">
            <div class="form-group">
              <label for="tendvs" class="text-f20b">Chọn phân hệ</label>
              <select name="tendvs" class="form-control text-f20 width-form-bd mb-2" v-model="optionPh">
                <option :value="-1">Chọn phân hệ chức năng</option>
                <option v-for="option in optionsPh" :value="option.MAPHCN">
                  {{ truncateText(option.TENPHCN, 60) }}
                </option>
              </select>
            </div>

            <div class="form-group input-container mb-5">
              <label for="tenphmoi" class="text-f20b">Nhập tên phân hệ mới</label>
              <Field type="text" class="form-control text-f20 width-form-bd mb-1" placeholder="Nhập tên phân hệ mới"
                v-model="tenphmoi" name="tenphmoi" />
              <ErrorMessage name="tenphmoi" class="error-message-content" />
            </div>

            <div class="canhgiua-ct">
              <v-btn :disabled="isTrue" @click="onSuaPhanHeChucNang" class="btn-add btn">
                SỬA
              </v-btn>
            </div>
          </Form>
        </div>
      </div>
    </div>

    <!-- Frame thêm chức năng -->
    <div v-if="addCnVisible && isAdmin" class="pd-content">
      <div class="title-content">
        <button @click="showFormHome" class="btn-img">
          <img class="img-width" src="../icons/Mt-back.png" alt="" />
        </button>
      </div>
      <hr />

      <div class="khung-bogoc mt-4">
        <div class="add-update2">
          <h3 class="h3-center mt-3">Thêm chức năng</h3>
          <Form ref="formAddCn" :validation-schema="FormSchemaAddCn">
            <div class="form-group mt-5">
              <label for="tendvs" class="text-f20b">Chức năng thuộc dịch vụ số</label>
              <select name="tendvs" class="form-control text-f20 width-form-bd mb-2" v-model="optionDvs">
                <option :value="-1">Chọn dịch vụ số</option>
                <option v-for="optionDvs in optionsDvs" :value="optionDvs.MADV">
                  {{ truncateText(optionDvs.TENDV, 60) }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="tendvs" class="text-f20b">Chức năng thuộc phân hệ</label>
              <select name="tenph" class="form-control text-f20 width-form-bd mb-2" v-model="optionPh">
                <option :value="-1">Chọn phân hệ chức năng</option>
                <option v-for="optionPh in optionsPh" :value="optionPh.MAPHCN">
                  {{ truncateText(optionPh.TENPHCN, 60) }}
                </option>
              </select>
            </div>

            <div class="form-group input-container">
              <label for="tencn" class="text-f20b">Nhập tên chức năng</label>
              <Field type="text" class="form-control text-f20 width-form-bd mb-1" placeholder="Nhập tên chức năng"
                v-model="tencn" name="tencn" />
              <ErrorMessage name="tencn" class="error-message-content" />
            </div>

            <div class="canhgiua-ct mt-5">
              <v-btn :disabled="isTrue" @click="onThemChucNang(optionDvs, optionPh)" class="btn-add btn">
                LƯU
              </v-btn>
            </div>
          </Form>
        </div>
      </div>
    </div>

    <!-- Frame sửa chức năng -->
    <div v-if="suaCnVisible && isAdmin" class="pd-content">
      <div class="title-content">
        <button @click="showFormHome" class="btn-img">
          <img class="img-width" src="../icons/Mt-back.png" alt="" />
        </button>
      </div>
      <hr />
      <div class="khung-bogoc mt-4">
        <div class="add-update2 input-container">
          <h3 class="h3-center mt-3">Sửa chức năng</h3>
          <Form ref="formUpdateCn" :validation-schema="FormSchemaUpdateCn">
            <div class="form-group mt-3">
              <label for="tendvs" class="text-f20b">Chọn chức năng</label>
              <select name="tendvs" class="form-control text-f20 width-form-bd mb-2" v-model="optionCn"
                @change="loadChucNang">
                <option :value="-1">Chọn chức năng</option>
                <option v-for="option in optionsCn" :value="option.MACHUCNANG">
                  {{ truncateText(option.TENCHUCNANG, 30) }} -
                  {{ truncateText(option.TENDV, 20) }} -
                  {{ truncateText(option.TENPHCN, 20) }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="tendvs" class="text-f20b">Chức năng thuộc dịch vụ số</label>
              <div>
                <select name="tendvs" class="form-control text-f20 width-form-bd mb-2" v-model="optionDvs">
                  <option :value="-1">Chọn dịch vụ số</option>
                  <option v-for="option in optionsDvs" :value="option.MADV">
                    {{ truncateText(option.TENDV, 35) }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="tendvs" class="text-f20b">Chức năng thuộc phân hệ</label>
              <div>
                <select name="tendvs" class="form-control text-f20 width-form-bd mb-2" v-model="optionPh">
                  <option :value="-1">Chọn phân hệ chức năng</option>
                  <option v-for="option in optionsPh" :value="option.MAPHCN">
                    {{ truncateText(option.TENPHCN, 35) }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="tencnmoi" class="text-f20b">Nhập tên chức năng mới</label>
              <div>
                <Field type="text" class="form-control text-f20 width-form-bd mb-1" placeholder="Nhập tên chức năng mới"
                  v-model="tencnmoi" name="tencnmoi" />
              </div>
              <ErrorMessage name="tencnmoi" class="error-message-content" />
            </div>

            <div class="canhgiua-ct mt-4-5">
              <v-btn :disabled="isTrue" @click="onSuaChucNang" class="btn-add btn">
                SỬA
              </v-btn>
            </div>
          </Form>
        </div>
      </div>
    </div>

    <!-- Chọn thao tác hdsdc -->
    <div v-if="addHdsdcVisible && isAdmin" class="pd-content">
      <div class="title-content">
        <button @click="showFormHome" class="btn-img">
          <img class="img-width" src="../icons/Mt-back.png" alt="" />
        </button>
        <h3 class="h3-center">CHỌN THAO TÁC MUỐN THỰC HIỆN</h3>
      </div>
      <div class="radio-group text-f mt-4 mb-4">
        <div class="center-label">
          <input class="mr-2" type="radio" id="radio1" name="radio-group" value="hdsdc"
            v-model="selectedOptionHDSDChung" />
          <label for="radio1">Thêm phiên bản HDSD Chung</label>
        </div>

        <div class="center-label">
          <input class="mr-2" type="radio" id="radio2" name="radio-group" value="shdsdc"
            v-model="selectedOptionHDSDChung" />
          <label for="radio2">Sửa phiên bản HDSD Chung</label>
        </div>
      </div>
      <hr />

      <div class="khung-bogoc mt-4 thanhroll">
        <!-- Thêm hdsd chung -->
        <div v-if="hdsdcVisible" class="sua khung-pbhdsdc">
          <h3 class="h3-center mt-3">Thêm phiên bản hướng dẫn sử dụng chung</h3>
          <Form ref="formAddHdsdc" :validation-schema="FormSchemaAddHdsdc">
            <div class="form-group sua-1 mt-4">
              <label for="tendvs" class="text-f20b">Chọn tên dịch vụ số</label>
              <select name="tendvs" class="form-control text-f20 width-form-bd mb-1" v-model="optionDvs">
                <option :value="-1">Chọn dịch vụ số</option>
                <option v-for="option in optionsDvs" :value="option.MADV">
                  {{ truncateText(option.TENDV, 35) }}
                </option>
              </select>
            </div>
            <div class="form-group input-container">
              <label for="tentieude" class="text-f20b">Nhập tiêu đề phiên bản</label>
              <Field type="text" class="form-control text-f20 width-form-bd mb-1" placeholder="Nhập tiêu đề phiên bản"
                v-model="tentieude" name="tentieude" />
              <ErrorMessage name="tentieude" class="error-message-content" />
            </div>

            <div class="form-group div-pace input-container">
              <label for="motahdsd" class="text-f20b">Mô tả HDSD</label>
              <Field as="textarea" type="text" class="form-control text-f20 width-form-bd mb-1"
                placeholder="Nhập mô tả hướng dẫn sử dụng chung" rows="3" v-model="motahdsd" name="motahdsd" />
              <ErrorMessage name="motahdsd" class="error-message-content" />
            </div>

            <div class="div-add-hdsdc div-pace">
              <div class="form-group div-upload-file ml-5 mt-2 mb-4">
                <label for="motahdsd" class="text-f20b">Tải tệp lên</label>
                <input type="file" ref="fileInput" @change="handleFileChange" style="display: none" />
                <v-btn class="btn-upload" @click="openFileInput">
                  <img :src="getFileIcon(fileName)" alt="" class="file-icon" />{{ truncateText(fileName, 30) }}
                </v-btn>
              </div>
              <div>
                <v-btn :disabled="isTrue" @click="onThemHDSDChung" class="btn-add btn ml-4">
                  LƯU
                </v-btn>
              </div>
            </div>
          </Form>
        </div>

        <!-- Sua hdsd chung -->
        <div v-if="shdsdcVisible" class="khung-pbhdsdc input-container">
          <h3 class="h3-center mt-3">Sửa phiên bản hướng dẫn sử dụng chung</h3>
          <Form ref="formUpdateHdsdc" :validation-schema="FormSchemaSuaHdsdc">
            <div class="sua-cn mt-4">
              <div class="form-group sua-1">
                <label for="tendvs" class="text-f20b">Chọn tên dịch vụ số</label>
                <select name="tendvs" class="form-control text-f20 width-form-bd" v-model="optionDvs"
                  @change="loadHDSDChung">
                  <option :value="-1">Chọn dịch vụ số</option>
                  <option v-for="option in optionsDvs" :value="option.MADV">
                    {{ truncateText(option.TENDV, 35) }}
                  </option>
                </select>
              </div>

              <div class="form-group sua-2">
                <label for="tentieude" class="text-f20b">Chọn tiêu đề phiên bản</label>
                <select name="tendvs" class="form-control text-f20 width-form-bd" v-model="optionHdsdc"
                  @change="loadPbHDSDChung">
                  <option :value="-1">Chọn tiêu đề phiên bản</option>
                  <option v-for="option in optionsHdsdc" :value="option.MAPHIENBAN">
                    {{ truncateText(option.TIEUDEPHIENBAN, 35) }}
                  </option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="tentieudem" class="text-f20b">Nhập tiêu đề phiên bản mới</label>
              <Field type="text" class="form-control text-f20 width-form-bd mb-1" placeholder="Nhập tiêu đề phiên bản mới"
                v-model="tentieudem" name="tentieudem" />
              <ErrorMessage name="tentieudem" class="error-message-content" />
            </div>

            <div class="form-group div-pace mt-4-5">
              <label for="motahdsdcm" class="text-f20b">Mô tả HDSD</label>
              <Field as="textarea" type="text" class="form-control text-f20 width-form-bd mb-1"
                placeholder="Nhập mô tả hướng dẫn sử dụng chung mới" rows="3" name="motahdsdcm" v-model="motahdsdcm" />
              <ErrorMessage name="motahdsdcm" class="error-message-content" />
            </div>

            <div class="div-add-hdsdc div-pace">
              <div class="form-group div-upload-file ml-5 mb-4">
                <label for="motahdsd" class="text-f20b">Tải tệp lên</label>
                <input type="file" ref="fileInput" @change="handleFileChange" style="display: none" />
                <v-btn class="btn-upload" @click="openFileInput">
                  <img :src="getFileIcon(fileNameMoi)" alt="" class="file-icon" />
                  {{ truncateText(fileNameMoi, 30) }}
                </v-btn>
              </div>
              <v-btn @click="showFormRevert" class="btn-add btn ml-auto">
                LỊCH SỬ
              </v-btn>
              <v-btn :disabled="isTrue" @click="onSuaHDSDChung" class="btn-add btn ml-4">
                SỬA
              </v-btn>
            </div>
          </Form>
        </div>
      </div>
    </div>

    <!-- Revert hdsdc -->
    <div v-if="revertVisible" class="pd-content">
      <div class="title-content">
        <button @click="showFormEditHdsdChung" class="btn-img">
          <img class="img-width" src="../icons/Mt-back.png" alt="" />
        </button>
        <h3 class="h3-center">LỊCH SỬ SỬA HƯỚNG DẪN SỬ DỤNG CHUNG</h3>
      </div>
      <hr />

      <div class="khung-bogoc mt-4">
        <div class="form-group w-25 ml-5">
          <label for="tendvs" class="text-f20b mt-3">Chọn tên dịch vụ số</label>
          <div class="div-revert">
            <select name="tendvs" class="form-control text-f20 width-form-bd" v-model="optionDvs" @change="loadHDSDChung">
              <option :value="-1">Chọn dịch vụ số</option>
              <option v-for="option in optionsDvs" :value="option.MADV">
                {{ truncateText(option.TENDV, 35) }}
              </option>
            </select>
            <select name="tendvs" class="form-control text-f20 width-form-bd ml-4" v-model="optionHdsdc"
              @change="loadPbHDSDChung">
              <option :value="-1">Chọn tiêu đề phiên bản</option>
              <option v-for="option in optionsHdsdc" :value="option.MAPHIENBAN">
                {{ truncateText(option.TIEUDEPHIENBAN, 35) }}
              </option>
            </select>
          </div>
        </div>

        <div class="canhgiua ml-5 mr-5 mt-3 mb-3 form-group khung-revert">
          <table class="equal-width-table-sua">
            <thead>
              <tr>
                <th class="th-td-sua w-stt">STT</th>
                <th class="th-td-sua w-tieude">Tiêu đề phiên bản sử dụng</th>
                <th class="th-td-sua w-thaydoi">Thay đổi</th>
                <th class="th-td-sua w-nguoisua">Người sửa</th>
                <th class="th-td-sua w-ngaysua">Ngày sửa</th>
                <th class="th-td-sua w-thaotac">Thao tác</th>
              </tr>
            </thead>
            <tbody v-for="(item, index) in historyHDSDChung" :key="item.id">
              <tr class="th-td-sua">
                <td class="th-td-sua w-stt">
                  <p class="p-table-sua">{{ index + 1 }}</p>
                </td>
                <td class="th-td-sua w-tieude">
                  <p class="p-table-sua">{{ item.title }}</p>
                </td>
                <td class="th-td-sua w-thaydoi">
                  <p class="p-table-sua">{{ item.edit }}</p>
                </td>
                <td class="th-td-sua w-nguoisua">
                  <p class="p-table-sua">{{ item.user }}</p>
                </td>
                <td class="th-td-sua w-ngaysua">
                  <p class="p-table-sua">{{ item.time }}</p>
                </td>
                <td class="th-td-sua w-thaotac">
                  <button class="btn-revert" :disabled="item.time === pbhdsdcItem.time" @click="revert(item)">
                    Khôi phục
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="mt-2" style="text-align: center" v-if="historyHDSDChung.length === 0">
            <p>Không tìm thấy lịch sử!</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Khoi phuc pbhdsd riêng-->
    <div v-if="revertHdsdVisible" class="pd-content">
      <div class="title-content">
        <button @click="showFormEditPbHdsd" class="btn-img">
          <img class="img-width" src="../icons/Mt-back.png" alt="" />
        </button>
        <h3 class="h3-center">LỊCH SỬ SỬA HƯỚNG DẪN SỬ DỤNG</h3>
      </div>
      <hr />

      <div class="khung-bogoc mt-4">
        <div class="form-group w-25 ml-5">
          <label for="tendvs" class="text-f20b mt-3">Chọn tên dịch vụ số</label>
          <div class="div-revert">
            <select name="tendvs" class="form-control text-f20 width-form-bd" v-model="optionDvs"
              @change="loadCnSuaPbHDSD">
              <option :value="-1">Chọn dịch vụ số</option>
              <option v-for="option in optionsDvs" :value="option.MADV">
                {{ truncateText(option.TENDV, 35) }}
              </option>
            </select>
            <select name="tendvs" class="form-control text-f20 width-form-bd ml-4" v-model="optionCn"
              @change="loadCnSuaPbHDSD">
              <option :value="-1">Chọn chức năng</option>
              <option v-for="option in optionsCn" :value="option.MACHUCNANG">
                {{ truncateText(option.TENCHUCNANG, 30) }} -
                {{ truncateText(option.TENDV, 20) }} -
                {{ truncateText(option.TENPHCN, 20) }}
              </option>
            </select>
            <select name="tendvs" class="form-control text-f20 width-form-bd ml-4" v-model="optionHdsd"
              @change="loadHDSDSuaPbHDSD">
              <option :value="-1">Chọn tên hdsd</option>
              <option v-for="option in optionsHdsd" :value="option.MAHDSD">
                {{ truncateText(option.TIEUDEHDSD, 35) }}
              </option>
            </select>
            <select name="tieudepb" class="form-control text-f20 width-form-bd ml-4" v-model="optionPbHdsd"
              @change="loadPbHdsdSuaPbHDSD">
              <option :value="-1">Chọn tiêu đề phiên bản HDSD</option>
              <option v-for="option in optionsPbHdsd" :value="option.MAPHIENBAN">
                {{ truncateText(option.TIEUDEPHIENBAN, 35) }}
              </option>
            </select>
          </div>
        </div>

        <div class="canhgiua ml-5 mr-5 mt-3 mb-3 form-group khung-revert">
          <table class="equal-width-table-sua">
            <thead>
              <tr>
                <th class="th-td-sua w-stt">STT</th>
                <th class="th-td-sua w-tieude">Tiêu đề phiên bản sử dụng</th>
                <th class="th-td-sua w-thaydoi">Thay đổi</th>
                <th class="th-td-sua w-nguoisua">Người sửa</th>
                <th class="th-td-sua w-ngaysua">Ngày sửa</th>
                <th class="th-td-sua w-thaotac">Thao tác</th>
              </tr>
            </thead>
            <tbody v-for="(item, index) in historyHDSDChung">
              <tr class="th-td-sua">
                <td class="th-td-sua w-stt">
                  <p class="p-table-sua">{{ index + 1 }}</p>
                </td>
                <td class="th-td-sua w-tieude">
                  <p class="p-table-sua">{{ item.title }}</p>
                </td>
                <td class="th-td-sua w-thaydoi">
                  <p class="p-table-sua">{{ item.edit }}</p>
                </td>
                <td class="th-td-sua w-nguoisua">
                  <p class="p-table-sua">{{ item.user }}</p>
                </td>
                <td class="th-td-sua w-ngaysua">
                  <p class="p-table-sua">{{ item.time }}</p>
                </td>
                <td class="th-td-sua w-thaotac">
                  <button class="btn-revert" v-if="item.revert" @click="revertPbHdsd(item)">
                    Khôi phục
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div style="text-align: center" v-if="historyHDSDChung.length === 0">
            <p>Không tìm thấy lịch sử!</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Thêm hdsd -->
    <div v-if="addHdsdVisible && isAdmin" class="pd-content">
      <div class="title-content">
        <button @click="showFormHome" class="btn-img">
          <img class="img-width" src="../icons/Mt-back.png" alt="" />
        </button>
      </div>
      <hr />

      <div class="khung-bogoc mt-4">
        <div class="sua2 input-container">
          <h3 class="h3-center mt-3">Thêm hướng dẫn sử dụng</h3>
          <Form ref="formAddHdsd" :validation-schema="FormSchemaAddHdsd">
            <div class="form-group mt-4">
              <label for="tendvs" class="text-f20b">HDSD thuộc dịch vụ số</label>
              <select name="tendvs" class="form-control text-f20 width-form-bd" v-model="optionDvs"
                @change="loadChucNangHDSD">
                <option :value="-1">Chọn dịch vụ số</option>
                <option v-for="option in optionsDvs" :value="option.MADV">
                  {{ truncateText(option.TENDV, 35) }}
                </option>
              </select>
            </div>

            <div class="form-group mt-2">
              <label for="tendvs" class="text-f20b">HDSD thuộc chức năng</label>
              <select name="tendvs" class="form-control text-f20 width-form-bd" v-model="optionCn" @change="loadChucNang">
                <option :value="-1">Chọn chức năng</option>
                <option v-for="option in optionsCn" :value="option.MACHUCNANG">
                  {{ truncateText(option.TENCHUCNANG, 30) }} -
                  {{ truncateText(option.TENDV, 20) }} -
                  {{ truncateText(option.TENPHCN, 20) }}
                </option>
              </select>
            </div>

            <div class="form-group mt-2">
              <label for="tenloai" class="text-f20b">Loại HDSD</label>
              <select name="tenloai" class="form-control text-f20 width-form-bd mb-2" v-model="optionLoai">
                <option :value="-1">Chọn loại</option>
                <option v-for="option in optionsLoai" :value="option.MALOAI">
                  {{ truncateText(option.TENLOAI, 35) }}
                </option>
              </select>
            </div>

            <div class="form-group mb-2">
              <label for="tenhdsd" class="text-f20b">Nhập tên HDSD</label>
              <div>
                <Field type="text" class="form-control text-f20 width-form-bd mb-1" placeholder="Nhập tên hdsd"
                  v-model="tenhdsd" name="tenhdsd" />
              </div>
              <ErrorMessage name="tenhdsd" class="error-message-content" />
            </div>

            <div class="canhgiua-ct mt-4-5">
              <v-btn :disabled="isTrue" @click="onThemHDSD" class="btn-add btn">
                LƯU
              </v-btn>
            </div>
          </Form>
        </div>
      </div>
    </div>

    <!-- Sua hdsd -->
    <div v-if="suaHdsdVisible && isAdmin" class="pd-content">
      <div class="title-content">
        <button @click="showFormHome" class="btn-img">
          <img class="img-width" src="../icons/Mt-back.png" alt="" />
        </button>
      </div>
      <hr />

      <div class="khung-bogoc mt-4">
        <div class="sua input-container">
          <h3 class="h3-center mt-3">Sửa hướng dẫn sử dụng</h3>
          <Form ref="formUpdateHdsd" :validation-schema="FormSchemaSuaHdsd">
            <div class="sua-cn mt-5">
              <div class="form-group sua-1">
                <label for="tendvs" class="text-f20b">Chọn tên HDSD</label>
                <select name="tendvs" class="form-control text-f20 width-form-bd mb-2" v-model="optionHdsd"
                  @change="loadHDSD">
                  <option :value="-1">Chọn dịch vụ số</option>
                  <option v-for="option in optionsHdsd" :value="option.MAHDSD">
                    {{ truncateText(option.TIEUDEHDSD, 35) }} -
                    {{ truncateText(option.TENCHUCNANG, 35) }} -
                    {{ truncateText(option.TENDV, 35) }}
                  </option>
                </select>
              </div>

              <div class="form-group sua-2">
                <label for="tendvs" class="text-f20b">HDSD thuộc dịch vụ số</label>
                <select name="tendvs" class="form-control text-f20 width-form-bd mb-2" v-model="optionDvs"
                  @change="loadChucNangHDSD">
                  <option :value="-1">Chọn dịch vụ số</option>
                  <option v-for="option in optionsDvs" :value="option.MADV">
                    {{ truncateText(option.TENDV, 35) }}
                  </option>
                </select>
              </div>
            </div>

            <div class="sua-cn">
              <div class="form-group sua-1 mb-2">
                <label for="tendvs" class="text-f20b">HDSD thuộc chức năng</label>

                <select name="tendvs" class="form-control text-f20 width-form-bd mb-2" v-model="optionCn">
                  <option :value="-1">Chọn chức năng</option>
                  <option v-for="option in optionsCn" :value="option.MACHUCNANG">
                    {{ truncateText(option.TENCHUCNANG, 30) }} -
                    {{ truncateText(option.TENDV, 20) }} -
                    {{ truncateText(option.TENPHCN, 20) }}
                  </option>
                </select>
              </div>

              <div class="form-group sua-2">
                <label for="tenloai" class="text-f20b">Loại HDSD</label>
                <select name="tenloai" class="form-control text-f20 width-form-bd" v-model="optionLoai">
                  <option :value="-1">Chọn dịch vụ số</option>
                  <option v-for="option in optionsLoai" :value="option.MALOAI">
                    {{ truncateText(option.TENLOAI, 35) }}
                  </option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="tenhdsdm" class="text-f20b">Nhập tên HDSD mới</label>
              <Field type="text" class="form-control text-f20 width-form-bd mb-1" placeholder="Nhập tên hdsd mới"
                v-model="tenhdsdm" name="tenhdsdm" />
              <ErrorMessage name="tenhdsdm" class="error-message-content" />
            </div>

            <div class="canhgiua-ct mt-5">
              <v-btn :disabled="isTrue" @click="onSuaHDSD" class="btn-add btn">
                SỬA
              </v-btn>
            </div>
          </Form>
        </div>
      </div>
    </div>

    <!-- Thêm phiên bản hdsd -->
    <div v-if="addPbHdsdVisible && isAdmin" class="pd-content">
      <div class="title-content">
        <button @click="showFormHome" class="btn-img">
          <img class="img-width" src="../icons/Mt-back.png" alt="" />
        </button>
      </div>
      <hr />

      <div class="khung-bogoc mt-4">
        <div class="thanhroll">
          <div class="khung-pbhdsd input-container">
            <h3 class="h3-center mt-3">Thêm phiên bản hướng dẫn sử dụng</h3>
            <Form ref="formAddPbHdsd" :validation-schema="FormSchemaAddPbHdsd">
              <div class="sua-cn mt-4">
                <div class="form-group sua-1">
                  <label for="tendvs" class="text-f20b">Chọn tên dịch vụ số</label>
                  <select name="tendvs" class="form-control text-f20 width-form-bd" v-model="optionDvs"
                    @change="loadDvsSuaPbHDSD">
                    <option :value="-1">Chọn dịch vụ số</option>
                    <option v-for="option in optionsDvs" :value="option.MADV">
                      {{ truncateText(option.TENDV, 35) }}
                    </option>
                  </select>
                </div>

                <div class="form-group sua-2">
                  <label for="tendvs" class="text-f20b">Chọn tên chức năng</label>
                  <select name="tendvs" class="form-control text-f20 width-form-bd" v-model="optionCn"
                    @change="loadCnSuaPbHDSD">
                    <option :value="-1">Chọn chức năng</option>
                    <option v-for="option in optionsCn" :value="option.MACHUCNANG">
                      {{ truncateText(option.TENCHUCNANG, 30) }} -
                      {{ truncateText(option.TENDV, 20) }} -
                      {{ truncateText(option.TENPHCN, 20) }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="sua-cn">
                <div class="form-group sua-1">
                  <label for="tenloai" class="text-f20b">Loại HDSD</label>
                  <select name="tenloai" class="form-control text-f20 width-form-bd" v-model="optionLoai"
                    @change="loadLoaiSuaPbHDSD">
                    <option :value="-1">Chọn loại hdsd</option>
                    <option v-for="option in optionsLoai" :value="option.MALOAI">
                      {{ truncateText(option.TENLOAI, 35) }}
                    </option>
                  </select>
                </div>

                <div class="form-group sua-2">
                  <label for="tendvs" class="text-f20b">Chọn tên HDSD</label>
                  <select name="tendvs" class="form-control text-f20 width-form-bd" v-model="optionHdsd"
                    @change="loadHDSDSuaPbHDSD">
                    <option :value="-1">Chọn tên hdsd</option>
                    <option v-for="option in optionsHdsd" :value="option.MAHDSD">
                      {{ truncateText(option.TIEUDEHDSD, 35) }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="tieudepb" class="text-f20b">Nhập tiêu đề phiên bản</label>
                <Field type="text" class="form-control text-f20 width-form-bd mb-1"
                  placeholder="Nhập tiêu đề phiên bản hướng dẫn sử dụng" v-model="tieudepb" name="tieudepb" />
                <ErrorMessage name="tieudepb" class="error-message-content" />
              </div>

              <div class="form-group div-pace">
                <label for="motapbhdsd" class="text-f20b">Mô tả phiên bản HDSD</label>
                <Field as="textarea" type="text" class="form-control text-f20 width-form-bd mb-1"
                  placeholder="Nhập mô tả phiên bản hướng dẫn sử dụng" rows="3" v-model="motapbhdsd" name="motapbhdsd" />
                <ErrorMessage name="motapbhdsd" class="error-message-content" />
              </div>

              <div class="div-add-hdsdc div-pace">
                <div class="form-group div-upload-file ml-5 mb-4">
                  <label for="motahdsd" class="text-f20b">Tải tệp lên</label>
                  <input type="file" ref="fileInput" @change="handleFileChange" style="display: none" />
                  <v-btn class="btn-upload" @click="openFileInput">
                    <img :src="getFileIcon(fileName)" alt="" class="file-icon" />{{ truncateText(fileName, 30) }}
                  </v-btn>
                </div>
                <div>
                  <v-btn :disabled="isTrue" @click="onThemPbHDSD" class="btn-add btn ml-4">
                    LƯU
                  </v-btn>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>

    <!-- Sửa pbhdsd -->
    <div v-if="suaPbHdsdVisible && isAdmin" class="pd-content">
      <div class="title-content">
        <button @click="showFormHome" class="btn-img">
          <img class="img-width" src="../icons/Mt-back.png" alt="" />
        </button>
      </div>
      <hr />

      <div class="khung-bogoc mt-4">
        <div class="thanhroll">
          <div class="khung-pbhdsd input-container">
            <h3 class="h3-center mt-3">Sửa phiên bản hướng dẫn sử dụng</h3>
            <Form ref="formUpdatePbHdsd" :validation-schema="FormSchemaSuaPbHdsd">
              <div class="sua-cn mt-4">
                <div class="form-group sua-1">
                  <label for="tendvs" class="text-f20b">Chọn tên dịch vụ số</label>
                  <div>
                    <select name="tendvs" class="form-control text-f20 width-form-bd" v-model="optionDvs"
                      @change="loadDvsSuaPbHDSD">
                      <option :value="-1">Chọn dịch vụ số</option>
                      <option v-for="option in optionsDvs" :value="option.MADV">
                        {{ truncateText(option.TENDV, 35) }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-group sua-2">
                  <label for="tendvs" class="text-f20b">Chọn tên chức năng</label>
                  <div>
                    <select name="tendvs" class="form-control text-f20 width-form-bd" v-model="optionCn"
                      @change="loadCnSuaPbHDSD">
                      <option :value="-1">Chọn chức năng</option>
                      <option v-for="option in optionsCn" :value="option.MACHUCNANG">
                        {{ truncateText(option.TENCHUCNANG, 30) }} -
                        {{ truncateText(option.TENDV, 20) }} -
                        {{ truncateText(option.TENPHCN, 20) }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="sua-cn mt-2">
                <div class="form-group sua-1">
                  <label for="tenloai" class="text-f20b">Loại HDSD</label>
                  <div>
                    <select name="tenloai" class="form-control text-f20 width-form-bd" v-model="optionLoai"
                      @change="loadLoaiSuaPbHDSD">
                      <option :value="-1">Chọn loại hdsd</option>
                      <option v-for="option in optionsLoai" :value="option.MALOAI">
                        {{ truncateText(option.TENLOAI, 35) }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-group sua-2">
                  <label for="tendvs" class="text-f20b">Chọn tên HDSD</label>
                  <div>
                    <select name="tendvs" class="form-control text-f20 width-form-bd" v-model="optionHdsd"
                      @change="loadHDSDSuaPbHDSD">
                      <option :value="-1">Chọn tên hdsd</option>
                      <option v-for="option in optionsHdsd" :value="option.MAHDSD">
                        {{ truncateText(option.TIEUDEHDSD, 35) }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="sua-cn mt-2">
                <div class="form-group sua-1">
                  <label for="tieudepb" class="text-f20b">Chọn tiêu đề phiên bản HDSD</label>
                  <div>
                    <select name="tieudepb" class="form-control text-f20 width-form-bd" v-model="optionPbHdsd"
                      @change="loadPbHdsdSuaPbHDSD">
                      <option :value="-1">Chọn tiêu đề phiên bản HDSD</option>
                      <option v-for="option in optionsPbHdsd" :value="option.MAPHIENBAN">
                        {{ truncateText(option.TIEUDEPHIENBAN, 35) }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-group sua-2 div-td">
                  <label for="tieudepbm" class="text-f20b">Nhập tiêu đề phiên bản mới</label>
                  <div>
                    <Field type="text" class="form-control text-f20 width-form-bd mb-1"
                      placeholder="Nhập tiêu đề phiên bản mới" v-model="tieudepbm" name="tieudepbm" />
                  </div>
                  <ErrorMessage name="tieudepbm" class="error-message-content" />
                </div>
              </div>

              <div class="form-group div-pace">
                <label for="motapbhdsdm" class="text-f20b">Mô tả phiên bản HDSD</label>
                <div>
                  <Field as="textarea" type="text" class="form-control text-f20 width-form-bd mb-1"
                    placeholder="Nhập mô tả phiên bản hướng dẫn sử dụng mới" rows="3" v-model="motapbhdsdm"
                    name="motapbhdsdm" />
                </div>
                <ErrorMessage name="motapbhdsdm" class="error-message-content" />
              </div>

              <div class="div-add-hdsdc div-pace">
                <div class="form-group div-upload-file ml-5 mb-4">
                  <label for="motapbhdsd" class="text-f20b">Tải tệp lên</label>
                  <input type="file" ref="fileInput" @change="handleFileChange" style="display: none" />
                  <v-btn class="btn-upload" @click="openFileInput">
                    <img :src="getFileIcon(fileNameMoi)" alt="" class="file-icon" />
                    {{ truncateText(fileNameMoi, 30) }}
                  </v-btn>
                </div>
                <v-btn @click="showFormRevertHdsd" class="btn-add btn ml-auto">
                  LỊCH SỬ
                </v-btn>
                <v-btn :disabled="isTrue" @click="onSuaPbHDSD" class="btn-add btn ml-4">
                  SỬA
                </v-btn>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
