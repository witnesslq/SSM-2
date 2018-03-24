package com.saitejn.services.impl;

import java.io.FileInputStream;
import java.io.InputStream;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;
import javax.swing.JRadioButton;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.saitejn.mapper.JfExcelInputCustomerMapper;
import com.saitejn.pojo.JbClassinfor;
import com.saitejn.pojo.JbUserifo;
import com.saitejn.pojo.JfRawdataHandle1;
import com.saitejn.pojo.JfRawdataHandle2;
import com.saitejn.pojo.JfUploadMiddle;
import com.saitejn.pojo.Jfclassinfo;
import com.saitejn.services.JF_UploadServices;
import com.saitejn.util.SheetCopy;
@Transactional
public class JF_UploadServicesImpl implements JF_UploadServices{
	@Autowired
	private JfExcelInputCustomerMapper jfExcelInputCustomerMapper;
	private Double average_Time_FIQ203;
	private Double average_Time_FIQ100;
	private Double average_Time_FIQ172;
	private Double average_Time_FIQ175;
	private Double average_Time_fuel_gas;
	private Double average_Time_FIQ162;
	private Double average_ton_nh3_gas_sum;
	@Override
	public List<JfUploadMiddle> readExcel_jf(String filePath) throws Exception {
		String excelPath =filePath;
		InputStream is = new FileInputStream(excelPath);//读取文件路径
		HSSFWorkbook hssfWorkbook = new HSSFWorkbook(is);
		
		JfUploadMiddle jfUploadMiddle = null;
		List<JfUploadMiddle> list = new ArrayList<JfUploadMiddle>();
		//循环工作表
		for(int numSheet = 0 ; numSheet < hssfWorkbook.getNumberOfSheets(); numSheet++){
			HSSFSheet hssfSheet = hssfWorkbook.getSheetAt(numSheet);
			if(hssfSheet == null){
				continue;
			}
			//循环Row
			for(int rowNum = 1; rowNum <hssfSheet.getLastRowNum()+1; rowNum ++){
				HSSFRow hssfRow = hssfSheet.getRow(rowNum);
				if(hssfRow != null){
					jfUploadMiddle = new JfUploadMiddle();
					HSSFCell time = hssfRow.getCell(0);
				if(time !=null || time.getCellType()!= HSSFCell.CELL_TYPE_BLANK){
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
					SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					String datetime = getValues(time);
					if(datetime.length()>0){
						Date date = sdf.parse(datetime);
						String timeis = sdf1.format(date);
						int isdate = jfExcelInputCustomerMapper.fingInputByJftime(timeis);
						if(isdate==0){
						jfUploadMiddle.setData_time(date);
						HSSFCell FI100 = hssfRow.getCell(1);
						jfUploadMiddle.setFI100(Double.valueOf(getValues(FI100)));
						HSSFCell FC101 = hssfRow.getCell(2);
						jfUploadMiddle.setFC101(Double.valueOf(getValues(FC101)));
						HSSFCell FC105 = hssfRow.getCell(3);
						jfUploadMiddle.setFC105(Double.valueOf(getValues(FC105)));
						HSSFCell FFY101 = hssfRow.getCell(4);
						jfUploadMiddle.setFFY101(Double.valueOf(getValues(FFY101)));
						HSSFCell FFY105 = hssfRow.getCell(5);
						jfUploadMiddle.setFFY105(Double.valueOf(getValues(FFY105)));
						HSSFCell FI203 = hssfRow.getCell(6);
						jfUploadMiddle.setFI203(Double.valueOf(getValues(FI203)));
						HSSFCell PC167 = hssfRow.getCell(7);
						jfUploadMiddle.setPC167(Double.valueOf(getValues(PC167)));
						HSSFCell FI175 = hssfRow.getCell(8);
						jfUploadMiddle.setFI175(Double.valueOf(getValues(FI175)));
						HSSFCell FI172 = hssfRow.getCell(9);
						jfUploadMiddle.setFI172(Double.valueOf(getValues(FI172)));
						HSSFCell FC191 = hssfRow.getCell(10);
	                    jfUploadMiddle.setFC191(Double.valueOf(getValues(FC191)));
						HSSFCell FC133 = hssfRow.getCell(11);
						jfUploadMiddle.setFC133(Double.valueOf(getValues(FC133)));
						HSSFCell FI162	= hssfRow.getCell(12);
						jfUploadMiddle.setFI162(Double.valueOf(getValues(FI162)));
						HSSFCell FI107	= hssfRow.getCell(13);
						jfUploadMiddle.setFI107(Double.valueOf(getValues(FI107)));
						HSSFCell FI207	= hssfRow.getCell(14);
						jfUploadMiddle.setFI207(Double.valueOf(getValues(FI207)));
						HSSFCell FI180	= hssfRow.getCell(15);
						jfUploadMiddle.setFI180(Double.valueOf(getValues(FI180)));
						HSSFCell FI177	= hssfRow.getCell(16);
						jfUploadMiddle.setFI177(Double.valueOf(getValues(FI177)));
						HSSFCell FI9005	= hssfRow.getCell(17);
						jfUploadMiddle.setFI9005(Double.valueOf(getValues(FI9005)));
						HSSFCell FI147	= hssfRow.getCell(18);
						jfUploadMiddle.setFI147(Double.valueOf(getValues(FI147)));
						HSSFCell FI199	= hssfRow.getCell(19);
						jfUploadMiddle.setFI199(Double.valueOf(getValues(FI199)));
						HSSFCell TI106	= hssfRow.getCell(20);
						jfUploadMiddle.setTI106(Double.valueOf(getValues(TI106)));
						HSSFCell TI240	= hssfRow.getCell(21);
						jfUploadMiddle .setTI240(Double.valueOf(getValues(TI240)));
						HSSFCell TI107	= hssfRow.getCell(22);
						jfUploadMiddle.setTI107(Double.valueOf(getValues(TI107)));
						HSSFCell TI124	= hssfRow.getCell(23);
						jfUploadMiddle.setTI124(Double.valueOf(getValues(TI124)));
						HSSFCell TI262	= hssfRow.getCell(24);
						jfUploadMiddle.setTI262(Double.valueOf(getValues(TI262)));
						HSSFCell TI125	= hssfRow.getCell(25);
						jfUploadMiddle.setTI125(Double.valueOf(getValues(TI125)));
						HSSFCell TI132	= hssfRow.getCell(26);
						jfUploadMiddle.setTI132(Double.valueOf(getValues(TI132)));
						HSSFCell TC127	= hssfRow.getCell(27);
						jfUploadMiddle.setTC127(Double.valueOf(getValues(TC127)));
						HSSFCell TI137	= hssfRow.getCell(28);
						jfUploadMiddle.setTI137(Double.valueOf(getValues(TI137)));
						HSSFCell TI153	= hssfRow.getCell(29);
						jfUploadMiddle.setTI153(Double.valueOf(getValues(TI153)));
						HSSFCell TI154	= hssfRow.getCell(30);
						jfUploadMiddle.setTI154(Double.valueOf(getValues(TI154)));
						HSSFCell TI274	= hssfRow.getCell(31);
						jfUploadMiddle.setTI274(Double.valueOf(getValues(TI274)));
						HSSFCell TI275	= hssfRow.getCell(32);
						jfUploadMiddle.setTI275(Double.valueOf(getValues(TI275)));
						HSSFCell PI176	= hssfRow.getCell(33);
						jfUploadMiddle.setPI176(Double.valueOf(getValues(PI176)));
						HSSFCell PI100	= hssfRow.getCell(34);
						jfUploadMiddle.setPI100(Double.valueOf(getValues(PI100)));
						HSSFCell PI109A = hssfRow.getCell(35);
						jfUploadMiddle.setPI109A(Double.valueOf(getValues(PI109A)));
						HSSFCell PC117	= hssfRow.getCell(36);
						jfUploadMiddle.setPC117(Double.valueOf(getValues(PC117)));
						HSSFCell PC123	= hssfRow.getCell(37);
						jfUploadMiddle.setPC123(Double.valueOf(getValues(PC123)));
						HSSFCell PI142	= hssfRow.getCell(38);
						jfUploadMiddle.setPI142(Double.valueOf(getValues(PI142)));
						HSSFCell PI182A =  hssfRow.getCell(39);
						jfUploadMiddle.setPI182A(Double.valueOf(getValues(PI182A)));
						HSSFCell PC153	= hssfRow.getCell(40);
						jfUploadMiddle.setPC153(Double.valueOf(getValues(PC153)));
						HSSFCell PC156	= hssfRow.getCell(41);
						jfUploadMiddle.setPC156(Double.valueOf(getValues(PC156)));
						HSSFCell AI113	= hssfRow.getCell(42);
						jfUploadMiddle.setAI113(Double.valueOf(getValues(AI113)));
						HSSFCell AI108	= hssfRow.getCell(43);
						jfUploadMiddle.setAI108(Double.valueOf(getValues(AI108)));
						HSSFCell AI100	= hssfRow.getCell(44);
						jfUploadMiddle.setAI100(Double.valueOf(getValues(AI100)));
						HSSFCell AI101	= hssfRow.getCell(45);
						jfUploadMiddle.setAI101(Double.valueOf(getValues(AI101)));
						HSSFCell AC102	= hssfRow.getCell(46);
						jfUploadMiddle.setAC102(Double.valueOf(getValues(AC102)));
						HSSFCell AI103	= hssfRow.getCell(47);
						jfUploadMiddle.setAI103(Double.valueOf(getValues(AI103)));
						HSSFCell AC111	= hssfRow.getCell(48);
						jfUploadMiddle.setAC111(Double.valueOf(getValues(AC111)));
						HSSFCell TI5301	= hssfRow.getCell(49);
						jfUploadMiddle.setTI5301(Double.valueOf(getValues(TI5301)));
						HSSFCell FI153	= hssfRow.getCell(50);
						if(FI153 != null){
							jfUploadMiddle.setFI153(Double.valueOf(getValues(FI153)));
						}
						HSSFCell FI116	= hssfRow.getCell(51);
						if(FI116 != null){
							jfUploadMiddle.setFI116(Double.valueOf(getValues(FI116)));
						}
						HSSFCell FI140	= hssfRow.getCell(52);
						if(FI140 !=null){
							jfUploadMiddle.setFI140(Double.valueOf(getValues(FI140)));
						}
						HSSFCell FI09802	= hssfRow.getCell(53);
						jfUploadMiddle.setFI09802(Double.valueOf(getValues(FI09802)));
						HSSFCell FI09803	= hssfRow.getCell(54);
						jfUploadMiddle.setFI09803(Double.valueOf(getValues(FI09803)));
						HSSFCell PC131	= hssfRow.getCell(55);
						jfUploadMiddle.setPC131(Double.valueOf(getValues(PC131)));
						HSSFCell TC200	= hssfRow.getCell(56);
						jfUploadMiddle.setTC200(Double.valueOf(getValues(TC200)));
						HSSFCell TI203F	= hssfRow.getCell(57);
						jfUploadMiddle.setTI203F(Double.valueOf(getValues(TI203F)));
						HSSFCell TI208A	= hssfRow.getCell(58);
						jfUploadMiddle.setTI208A(Double.valueOf(getValues(TI208A)));
						HSSFCell TI210H = hssfRow.getCell(59);
						jfUploadMiddle.setTI210H(Double.valueOf(getValues(TI210H)));
						HSSFCell TI266A = hssfRow.getCell(60);
						jfUploadMiddle.setTI266A(Double.valueOf(getValues(TI266A)));
						HSSFCell TI268H = hssfRow.getCell(61);
						jfUploadMiddle.setTI268H(Double.valueOf(getValues(TI268H)));
						HSSFCell TI239 = hssfRow.getCell(62);
						jfUploadMiddle.setTI239(Double.valueOf(getValues(TI239)));
						HSSFCell TC142 = hssfRow.getCell(63);
						jfUploadMiddle.setTC142(Double.valueOf(getValues(TC142)));
						HSSFCell TC144 = hssfRow.getCell(64);
						jfUploadMiddle.setTC144(Double.valueOf(getValues(TC144)));
						HSSFCell FI163 = hssfRow.getCell(65);
						jfUploadMiddle.setFI163(Double.valueOf(getValues(FI163)));
						
						
						HSSFCell FIQ203 = hssfRow.getCell(66);
						jfUploadMiddle.setFIQ203(Double.valueOf(getValues(FIQ203)));
						HSSFCell FIQ100 = hssfRow.getCell(67);
						jfUploadMiddle.setFIQ100(Double.valueOf(getValues(FIQ100)));
						HSSFCell FIQ172 = hssfRow.getCell(68);
						jfUploadMiddle.setFIQ172(Double.valueOf(getValues(FIQ172)));
						HSSFCell FIQ175 = hssfRow.getCell(69);
						jfUploadMiddle.setFIQ175(Double.valueOf(getValues(FIQ175)));
						HSSFCell FIQ162 = hssfRow.getCell(70);
						jfUploadMiddle.setFIQ162(Double.valueOf(getValues(FIQ162)));
						HSSFCell FIQ221A = hssfRow.getCell(71);
						jfUploadMiddle.setFIQ221A(Double.valueOf(getValues(FIQ221A)));
						HSSFCell FIQ221B = hssfRow.getCell(72);
						jfUploadMiddle.setFIQ221B(Double.valueOf(getValues(FIQ221B)));
						HSSFCell FIQ180 = hssfRow.getCell(73);
						jfUploadMiddle.setFIQ180(Double.valueOf(getValues(FIQ180)));
						HSSFCell FIQ9802 = hssfRow.getCell(74);
						jfUploadMiddle.setFIQ9802(Double.valueOf(getValues(FIQ9802)));
						HSSFCell FIQ9005 = hssfRow.getCell(75);
						jfUploadMiddle.setFIQ9005(Double.valueOf(getValues(FIQ9005)));
						HSSFCell FIQ9803 = hssfRow.getCell(76);
						jfUploadMiddle.setFIQ9803(Double.valueOf(getValues(FIQ9803)));
						HSSFCell FI204 = hssfRow.getCell(77);
						jfUploadMiddle.setFI204(Double.valueOf(getValues(FI204)));
						HSSFCell FI240 = hssfRow.getCell(78);
						jfUploadMiddle.setFI240(Double.valueOf(getValues(FI240)));
						HSSFCell FI241 = hssfRow.getCell(79);
						jfUploadMiddle.setFI241(Double.valueOf(getValues(FI241)));
						HSSFCell FI242 = hssfRow.getCell(80);
						jfUploadMiddle.setFI242(Double.valueOf(getValues(FI242)));
						HSSFCell FI146 = hssfRow.getCell(81);
						jfUploadMiddle.setFI146(Double.valueOf(getValues(FI146)));
						HSSFCell TI5302 = hssfRow.getCell(82);
						jfUploadMiddle.setTI5302(Double.valueOf(getValues(TI5302)));
						HSSFCell FIQ159 = hssfRow.getCell(83);
						jfUploadMiddle.setFIQ159(Double.valueOf(getValues(FIQ159)));
						HSSFCell PC165 = hssfRow.getCell(84);
						jfUploadMiddle.setPC165(Double.valueOf(getValues(PC165)));
						HSSFCell PC166 = hssfRow.getCell(85);
						jfUploadMiddle.setPC166(Double.valueOf(getValues(PC166)));
						HSSFCell FIQ153 = hssfRow.getCell(86);
						jfUploadMiddle.setFIQ153(Double.valueOf(getValues(FIQ153)));
						HSSFCell P156 = hssfRow.getCell(87);
						jfUploadMiddle.setP156(Double.valueOf(getValues(P156)));
						HSSFCell FQ116 = hssfRow.getCell(88);
						jfUploadMiddle.setFQ116(Double.valueOf(getValues(FQ116)));
						HSSFCell TI104 = hssfRow.getCell(89);
						jfUploadMiddle.setTI104(Double.valueOf(getValues(TI104)));
						HSSFCell TI113 = hssfRow.getCell(90);
						jfUploadMiddle.setTI113(Double.valueOf(getValues(TI113)));
						HSSFCell TI109 = hssfRow.getCell(91);
						jfUploadMiddle.setTI109(Double.valueOf(getValues(TI109)));
						HSSFCell PI7 = hssfRow.getCell(92);
						jfUploadMiddle.setPI7(Double.valueOf(getValues(PI7)));
						HSSFCell TI213 = hssfRow.getCell(93);
						jfUploadMiddle.setTI213(Double.valueOf(getValues(TI213)));
						HSSFCell TI188 = hssfRow.getCell(94);
						jfUploadMiddle.setTI188(Double.valueOf(getValues(TI188)));
						HSSFCell PC144 = hssfRow.getCell(95);
						jfUploadMiddle.setPC144(Double.valueOf(getValues(PC144)));
						HSSFCell PDI137 = hssfRow.getCell(96);
						jfUploadMiddle.setPDI137(Double.valueOf(getValues(PDI137)));
						HSSFCell TC105 = hssfRow.getCell(97);
						jfUploadMiddle.setTC105(Double.valueOf(getValues(TC105)));
						HSSFCell TI276 = hssfRow.getCell(98);
						jfUploadMiddle.setTI276(Double.valueOf(getValues(TI276)));
						HSSFCell TI233 = hssfRow.getCell(99);
						jfUploadMiddle.setTI233(Double.valueOf(getValues(TI233)));
						HSSFCell TI148 = hssfRow.getCell(100);
						jfUploadMiddle.setTI148(Double.valueOf(getValues(TI148)));
						HSSFCell TI140 = hssfRow.getCell(101);
						jfUploadMiddle.setTI140(Double.valueOf(getValues(TI140)));
						HSSFCell FI117 = hssfRow.getCell(102);
						jfUploadMiddle.setFI117(Double.valueOf(getValues(FI117)));
						HSSFCell FI118 = hssfRow.getCell(103);
						jfUploadMiddle.setFI118(Double.valueOf(getValues(FI118)));
						HSSFCell FQ146 = hssfRow.getCell(104);
						jfUploadMiddle.setFQ146(Double.valueOf(getValues(FQ146)));
						HSSFCell FQ240 = hssfRow.getCell(105);
						jfUploadMiddle.setFQ240(Double.valueOf(getValues(FQ240)));
						HSSFCell FQ241 = hssfRow.getCell(106);
						jfUploadMiddle.setFQ241(Double.valueOf(getValues(FQ241)));
						HSSFCell FQ242 = hssfRow.getCell(107);
						jfUploadMiddle.setFQ242(Double.valueOf(getValues(FQ242)));
						
			
					 
						
						list.add(jfUploadMiddle);
					  Collections.sort(list,new Comparator<JfUploadMiddle>() {

						@Override
						public int compare(JfUploadMiddle o1, JfUploadMiddle o2) {
							if(o1.getData_time().getTime() > o2.getData_time().getTime()){
								return 1;
							}
							if(o1.getData_time().getTime() == o2.getData_time().getTime()){
								return 0;
							}
							
							return -1;
						}
					});
			
			}else {
				continue;
			}
					}
					
				}
					
				}
			}
			
		}
		return list;
	}
	private String getValues(HSSFCell hssfCell){
		if(hssfCell.getCellType()== hssfCell.CELL_TYPE_BOOLEAN){
			//返回布尔类型的值
			return  String.valueOf(hssfCell.getBooleanCellValue());
			}else if(hssfCell.getCellType() == hssfCell.CELL_TYPE_NUMERIC){
				//返回数值类型的值
				return String.valueOf(hssfCell.getNumericCellValue());
			}
			else{
				//返回字符串类型的值
			
				return String.valueOf(hssfCell.getStringCellValue());
			}
	}
	@Override
	public void insertDataToMiddle_jf(JfUploadMiddle jfUploadMiddle)
			throws Exception {
		
		jfExcelInputCustomerMapper.saveDatetomiddle(jfUploadMiddle);
	}
	@Override
	public void insertDataToExcel_jf(JfUploadMiddle jfUploadMiddle) throws Exception {
		jfExcelInputCustomerMapper.saveDatetoExcel(jfUploadMiddle);
	}
	@Override
	public void insertDataToHand1_jf()
			throws Exception {
		List<JfUploadMiddle> jfRawdataHandle1s = jfExcelInputCustomerMapper.selectAllJfMiddle();
		 List<JfRawdataHandle1> jfrlist = new ArrayList<JfRawdataHandle1>();
		for(int i = 0; i < jfRawdataHandle1s.size(); i++){
			JfUploadMiddle  jfUploadMiddle = jfRawdataHandle1s.get(i);
			JfRawdataHandle1 jfRawdataHandle1 = new JfRawdataHandle1();
			jfRawdataHandle1.setData_time(jfUploadMiddle.getData_time());
			
			jfRawdataHandle1.setFI100(jfUploadMiddle.getFI100());
			jfRawdataHandle1.setFC101(jfUploadMiddle.getFC101());
			jfRawdataHandle1.setFC105(jfUploadMiddle.getFC105());
			jfRawdataHandle1.setFFY101(jfUploadMiddle.getFFY101());
			jfRawdataHandle1.setFFY105(jfUploadMiddle.getFFY105());
			jfRawdataHandle1.setFI203(jfUploadMiddle.getFI203());
			jfRawdataHandle1.setPC167(jfUploadMiddle.getPC167());
			jfRawdataHandle1.setFI175(jfUploadMiddle.getFI175());
			jfRawdataHandle1.setFI172(jfUploadMiddle.getFI172());
			jfRawdataHandle1.setFC191(jfUploadMiddle.getFC191());
			jfRawdataHandle1.setFC133(jfUploadMiddle.getFC133());
			jfRawdataHandle1.setFI162(jfUploadMiddle.getFI162());
			jfRawdataHandle1.setFI107(jfUploadMiddle.getFI107());
			jfRawdataHandle1.setFI207(jfUploadMiddle.getFI207());
			jfRawdataHandle1.setFI180(jfUploadMiddle.getFI180());
			jfRawdataHandle1.setFI177(jfUploadMiddle.getFI177());
			jfRawdataHandle1.setFI9005(jfUploadMiddle.getFI9005());
			jfRawdataHandle1.setFI147(jfUploadMiddle.getFI147());
			jfRawdataHandle1.setFI199(jfUploadMiddle.getFI199());
			jfRawdataHandle1.setTI106(jfUploadMiddle.getTI106());
			jfRawdataHandle1.setTI240(jfUploadMiddle.getTI240());
			jfRawdataHandle1.setTI107(jfUploadMiddle.getTI107());
			jfRawdataHandle1.setTI124(jfUploadMiddle.getTI124());
			jfRawdataHandle1.setTI262(jfUploadMiddle.getTI262());
			jfRawdataHandle1.setTI125(jfUploadMiddle.getTI125());
			jfRawdataHandle1.setTI132(jfUploadMiddle.getTI132());
			jfRawdataHandle1.setTC127(jfUploadMiddle.getTC127());
			jfRawdataHandle1.setTI137(jfUploadMiddle.getTI137());
			jfRawdataHandle1.setTI153(jfUploadMiddle.getTI153());
			jfRawdataHandle1.setTI154(jfUploadMiddle.getTI154());
			jfRawdataHandle1.setTI274(jfUploadMiddle.getTI274());
			jfRawdataHandle1.setTI275(jfUploadMiddle.getTI275());
			jfRawdataHandle1.setPI176(jfUploadMiddle.getPI176());
			jfRawdataHandle1.setPI100(jfUploadMiddle.getPI100());
			jfRawdataHandle1.setPI109A(jfUploadMiddle.getPI109A());
			jfRawdataHandle1.setPC117(jfUploadMiddle.getPC117());
			jfRawdataHandle1.setPC123(jfUploadMiddle.getPC123());
			jfRawdataHandle1.setPI142(jfUploadMiddle.getPI142());
			jfRawdataHandle1.setPI182A(jfUploadMiddle.getPI182A());
			jfRawdataHandle1.setPC153(jfUploadMiddle.getPC153());
			jfRawdataHandle1.setPC156(jfUploadMiddle.getPC156());
			jfRawdataHandle1.setAI113(jfUploadMiddle.getAI113());
			jfRawdataHandle1.setAI108(jfUploadMiddle.getAI108());
			jfRawdataHandle1.setAI100(jfUploadMiddle.getAI100());
			jfRawdataHandle1.setAI101(jfUploadMiddle.getAI101());
			jfRawdataHandle1.setAC102(jfUploadMiddle.getAC102());
			jfRawdataHandle1.setAI103(jfUploadMiddle.getAI103());
			jfRawdataHandle1.setAC111(jfUploadMiddle.getAC111());
			jfRawdataHandle1.setTI5301(jfUploadMiddle.getTI5301());
			jfRawdataHandle1.setFI153(jfUploadMiddle.getFI153());
			jfRawdataHandle1.setFI116(jfUploadMiddle.getFI116());
			jfRawdataHandle1.setFI140(jfUploadMiddle.getFI140());
			jfRawdataHandle1.setFI09802(jfUploadMiddle.getFI09802());
			jfRawdataHandle1.setFI09803(jfUploadMiddle.getFI09803());
			jfRawdataHandle1.setPC131(jfUploadMiddle.getPC131());
			jfRawdataHandle1.setTC200(jfUploadMiddle.getTC200());
			jfRawdataHandle1.setTI203F(jfUploadMiddle.getTI203F());
			jfRawdataHandle1.setTI208A(jfUploadMiddle.getTI208A());
			jfRawdataHandle1.setTI210H(jfUploadMiddle.getTI210H());
			jfRawdataHandle1.setTI266A(jfUploadMiddle.getTI266A());
			jfRawdataHandle1.setTI268H(jfUploadMiddle.getTI268H());
			jfRawdataHandle1.setTI239(jfUploadMiddle.getTI239());
			jfRawdataHandle1.setTC142(jfUploadMiddle.getTC142());
			jfRawdataHandle1.setTC144(jfUploadMiddle.getTC144());
			jfRawdataHandle1.setFI163(jfUploadMiddle.getFI163());
			jfRawdataHandle1.setFI204(jfUploadMiddle.getFI204());
			jfRawdataHandle1.setFI240(jfUploadMiddle.getFI240());
			jfRawdataHandle1.setFI241(jfUploadMiddle.getFI241());
			jfRawdataHandle1.setFI242(jfUploadMiddle.getFI242());
			jfRawdataHandle1.setFI146(jfUploadMiddle.getFI146());
			jfRawdataHandle1.setTI5302(jfUploadMiddle.getTI5302());
			jfRawdataHandle1.setPC165(jfUploadMiddle.getPC165());
			jfRawdataHandle1.setPC166(jfUploadMiddle.getPC166());
			jfRawdataHandle1.setP156(jfUploadMiddle.getP156());
			jfRawdataHandle1.setTI104(jfUploadMiddle.getTI104());
			jfRawdataHandle1.setTI113(jfUploadMiddle.getTI113());
			jfRawdataHandle1.setTI109(jfUploadMiddle.getTI109());
			jfRawdataHandle1.setPI7(jfUploadMiddle.getPI7());
			jfRawdataHandle1.setTI213(jfUploadMiddle.getTI213());
			jfRawdataHandle1.setTI188(jfUploadMiddle.getTI188());
			jfRawdataHandle1.setPC144(jfUploadMiddle.getPC144());
			jfRawdataHandle1.setPDI137(jfUploadMiddle.getPDI137());
			jfRawdataHandle1.setTC105(jfUploadMiddle.getTC105());
			jfRawdataHandle1.setTI276(jfUploadMiddle.getTI276());
			jfRawdataHandle1.setTI233(jfUploadMiddle.getTI233());
			jfRawdataHandle1.setTI148(jfUploadMiddle.getTI148());
			jfRawdataHandle1.setTI140(jfUploadMiddle.getTI140());
			jfRawdataHandle1.setFI117(jfUploadMiddle.getFI117());
			jfRawdataHandle1.setFI118(jfUploadMiddle.getFI118());
			jfRawdataHandle1.setFIQ203(jfUploadMiddle.getFIQ203());
			jfRawdataHandle1.setFIQ100(jfUploadMiddle.getFIQ100());
			jfRawdataHandle1.setFIQ172(jfUploadMiddle.getFIQ172());
			jfRawdataHandle1.setFIQ175(jfUploadMiddle.getFIQ175());
			jfRawdataHandle1.setFIQ162(jfUploadMiddle.getFIQ162());
			jfRawdataHandle1.setFIQ221A(jfUploadMiddle.getFIQ221A());
			jfRawdataHandle1.setFIQ221B(jfUploadMiddle.getFIQ221B());
			jfRawdataHandle1.setFIQ180(jfUploadMiddle.getFIQ180());
			jfRawdataHandle1.setFIQ9802(jfUploadMiddle.getFIQ9802());
			jfRawdataHandle1.setFIQ9005(jfUploadMiddle.getFIQ9005());
			jfRawdataHandle1.setFIQ9803(jfUploadMiddle.getFIQ9803());
			jfRawdataHandle1.setFIQ159(jfUploadMiddle.getFIQ159());
			jfRawdataHandle1.setFIQ153(jfUploadMiddle.getFIQ153());
			jfRawdataHandle1.setFQ116(jfUploadMiddle.getFQ116());
			jfRawdataHandle1.setFQ146(jfUploadMiddle.getFQ146());
			jfRawdataHandle1.setFQ240(jfUploadMiddle.getFQ240());
			jfRawdataHandle1.setFQ241(jfUploadMiddle.getFQ241());
			jfRawdataHandle1.setFQ242(jfUploadMiddle.getFQ242());

			jfrlist.add(jfRawdataHandle1);
		 }
		
		JfRawdataHandle1 jfRawdataHandle1 = jfExcelInputCustomerMapper.selectTopOneHandl1();
		
		if(jfRawdataHandle1 != null){
			jfrlist.add(jfRawdataHandle1);
			 Collections.sort(jfrlist,new Comparator<JfRawdataHandle1>() {

					@Override
					public int compare(JfRawdataHandle1 o1, JfRawdataHandle1 o2) {
						if(o1.getData_time().getTime() > o2.getData_time().getTime()){
							return 1;
						}
						if(o1.getData_time().getTime() == o2.getData_time().getTime()){
							return 0;
						}
						
						return -1;
					}
				});
		}
		 
		if(jfrlist.size() >0){
			 for(int i = 0 ;i<jfrlist.size()-1;i++){
				 JfRawdataHandle1 btime = jfrlist.get(i);
				 JfRawdataHandle1 etime = jfrlist.get(i+1);
				 //班次
				 Date date = etime.getData_time();
				String classtime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);
					//截取年
				String year = classtime.substring(0, 10);
				Jfclassinfo jfClassinfor = jfExcelInputCustomerMapper.seclectByTime(year);
				//截取时分秒
				String mdate = classtime.substring(11, 19);
				if(isInTime("00:00-00:01", mdate)){
					Calendar mvc = Calendar.getInstance(); 
					mvc.setTime(date); 
					mvc.set(Calendar.DATE, mvc.get(Calendar.DATE) - 1);
					Date date2 = mvc.getTime();
					String newclasstime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date2);
					//截取年
					String nyear = newclasstime.substring(0, 10);
					Jfclassinfo njbClassinfor = jfExcelInputCustomerMapper.seclectByTime(nyear);
					int m = njbClassinfor.getAftclass();
					etime.setShift(m);
					
				}
				if(isInTime("00:01-08:01", mdate)){
					Calendar mvc = Calendar.getInstance(); 
					mvc.setTime(date); 
					mvc.set(Calendar.DATE, mvc.get(Calendar.DATE) - 1);
					Date date2 = mvc.getTime();
					String newclasstime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date2);
					//截取年
					String nyear = newclasstime.substring(0, 10);
					Jfclassinfo njbClassinfor = jfExcelInputCustomerMapper.seclectByTime(nyear);
					int m = njbClassinfor.getEveclass();
					etime.setShift(m);
					
				}
				
				
				if(isInTime("08:01-16:01", mdate)){
					int m = jfClassinfor.getMorclass();
					etime.setShift(m);
				}
				if(isInTime("16:01-23:59", mdate)){
					int a = jfClassinfor.getAftclass();
					etime.setShift(a);
				}
				 //初始数据
				 if(etime.getFIQ162()-btime.getFIQ162() != 0.0){
					//计算的数据
					 //时段FIQ203(Nm3/10min)=1000×(本时刻FIQ203 – 上一时刻FIQ203)
					 double Time_FIQ203= 1000*(etime.getFIQ203()-btime.getFIQ203());
					 etime.setTime_FIQ203(Time_FIQ203);
					 //时段FIQ162(t/10min)=本时刻FIQ162 – 上一时刻FIQ162
					 etime.setTime_FIQ162(etime.getFIQ162()-btime.getFIQ162());
					 //时段FIQ221A(折标煤)(kgce/10min)
					 double Time_FIQ221A = 98.0020063*(etime.getFIQ221A()-btime.getFIQ221A());
					 BigDecimal bTime_FIQ221A = new BigDecimal(Time_FIQ221A);
					 Double eTime_FIQ221A = bTime_FIQ221A.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
					 etime.setTime_FIQ221A(eTime_FIQ221A);
					 //时段FIQ221B(折标煤)(kgce/10min)
					 double Time_FIQ221B = 98.0020063*(etime.getFIQ221B()-btime.getFIQ221B());
					 BigDecimal bTime_FIQ221B = new BigDecimal(Time_FIQ221B);
					 Double eTime_FIQ221B = bTime_FIQ221B.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
					 etime.setTime_FIQ221B(eTime_FIQ221B);
					 //时段FIQ180(折标煤
					 double Time_FIQ180 = 108.2335278*(etime.getFIQ180()-btime.getFIQ180());
					 BigDecimal bTime_FIQ180 = new BigDecimal(Time_FIQ180);
					 Double eTime_FIQ180 = bTime_FIQ180.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
					 etime.setTime_FIQ180(eTime_FIQ180);
					 // 时段FIQ9802(折标煤)
					 double Time_FIQ9802 = 108.2335278*(etime.getFIQ9802()-btime.getFIQ9802());
					 BigDecimal bTime_FIQ9802 = new BigDecimal(Time_FIQ9802);
					 Double eTime_FIQ9802 = bTime_FIQ9802.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
					 etime.setTime_FIQ9802(eTime_FIQ9802);
					 //时段FIQ9005
					 double Time_FIQ9005 = 132.0027024*(etime.getFIQ9005()-btime.getFIQ9005());
					 BigDecimal bTime_FIQ9005 = new BigDecimal(Time_FIQ9005);
					 Double eTime_FIQ9005 = bTime_FIQ9005.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
					 etime.setTime_FIQ9005(eTime_FIQ9005);
					 //时段蒸汽消耗(折标煤)(kgce/10min)= - 时段FIQ221A(折标煤) +时段FIQ221B(折标煤)+ 时段FIQ180(折标煤) - 时段FIQ9802(折标煤) - 时段FIQ9005(折标煤)
					 double Time_steam_coal = -Time_FIQ221A+Time_FIQ221B+Time_FIQ180-Time_FIQ9802-Time_FIQ9005;
					 etime.setTime_steam_coal(Time_steam_coal);
					 //时段蒸汽耗折天然气
					 double Time_steam_gas = Time_steam_coal/1.2143;
					 BigDecimal bTime_steam_gas = new BigDecimal(Time_steam_gas);
					 Double eTime_steam_gas =bTime_steam_gas.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
					 etime.setTime_steam_gas(eTime_steam_gas);
					 //时段气耗合计
					 double Time_gas_sum = Time_FIQ203+Time_steam_gas;
					 BigDecimal bTime_gas_sum = new BigDecimal(Time_gas_sum);
					 Double eTime_gas_sum =bTime_gas_sum.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
					 etime.setTime_gas_sum(eTime_gas_sum);
					 //时段驰放气流量(Nm3/10min)
					 double Time_purge = 1000*(etime.getFIQ153()-btime.getFIQ153());
					 etime.setTime_purge(Time_purge);
					 //时段驰放气折氨产量
					 double Time_purge_nh3 =  (0.043*17.031*Time_purge*293.15)/(22.4*273.15*1000);
					 BigDecimal bTime_purge_nh3 = new BigDecimal(Time_purge_nh3);
					 Double eTime_purge_nh3 = bTime_purge_nh3.setScale(4,BigDecimal.ROUND_HALF_UP).doubleValue();
					 etime.setTime_purge_nh3(eTime_purge_nh3);
					 
					 if(etime.getP156()>18){
						 etime.setTime_NH3(etime.getFIQ162()-btime.getFIQ162());
					 }else{
						 etime.setTime_NH3(etime.getFIQ162()-btime.getFIQ162()+Time_purge_nh3);
					 }
					 //系统负荷(%)=100×FI100÷30660
					 etime.setSystem_load(100*etime.getFI100()/30660);
					 //小时氨产量(t/h)= 6×时段FIQ162
					 etime.setHour_nh3_yield(6*(etime.getFIQ162()-btime.getFIQ162()));
					 // 小时氨产量(含驰放气折算)(t/h)= 6×时段氨产量(含驰放气折算)
					 if(etime.getP156()>18){
						 etime.setHour_nh3_purge(6*(etime.getFIQ162()-btime.getFIQ162()));
					 }else{
						 etime.setHour_nh3_purge(6*(etime.getFIQ162()-btime.getFIQ162()+Time_purge_nh3));
					 }
					 //吨氨天然气耗(Nm3/tNH3)=时段FIQ203÷时段氨产量(含驰放气折算)
					 if(etime.getP156()>18){
						 double  Ton_nh3_gas = Time_FIQ203/(etime.getFIQ162()-btime.getFIQ162());
						 BigDecimal bTon_nh3_gas = new BigDecimal(Ton_nh3_gas);
						 Double eTon_nh3_gas = bTon_nh3_gas.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
						 etime.setTon_nh3_gas(eTon_nh3_gas);
					 }else{
						 double Ton_nh3_gas = Time_FIQ203/(etime.getFIQ162()-btime.getFIQ162()+Time_purge_nh3);
						 BigDecimal bTon_nh3_gas = new BigDecimal(Ton_nh3_gas);
						 Double eTon_nh3_gas = bTon_nh3_gas.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
						 etime.setTon_nh3_gas(eTon_nh3_gas);
					 }
					//吨氨蒸汽耗(折标煤)(Nm3/tNH3)=时段蒸汽耗(折天然气)÷时段氨产量(含驰放气折算)
					 if(etime.getP156()>18){
						 double Ton_nh3_steam = Time_steam_coal/(etime.getFIQ162()-btime.getFIQ162());
						 BigDecimal bTon_nh3_steam = new BigDecimal(Ton_nh3_steam);
						 Double eTon_nh3_steam = bTon_nh3_steam.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
						 etime.setTon_nh3_steam(eTon_nh3_steam);
					 }else{
						 double Ton_nh3_steam = Time_steam_coal/(etime.getFIQ162()-btime.getFIQ162()+Time_purge_nh3);
						 BigDecimal bTon_nh3_steam = new BigDecimal(Ton_nh3_steam);
						 Double eTon_nh3_steam = bTon_nh3_steam.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
						 etime.setTon_nh3_steam(eTon_nh3_steam);
					 }
					
					//吨氨综合消耗(kgce/tNH3)=1.2143×吨氨气耗(合计)
					 if(etime.getP156()>18){
						 double Ton_nh3_cons = (1.2143*(Time_FIQ203/(etime.getFIQ162()-btime.getFIQ162()))+(Time_steam_coal/(etime.getFIQ162()-btime.getFIQ162()))+0);
						 BigDecimal bTon_nh3_cons = new BigDecimal(Ton_nh3_cons);
						 Double eTon_nh3_cons = bTon_nh3_cons.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
						 etime.setTonnh3_compre_consume(eTon_nh3_cons);
					 }else{
						 double Ton_nh3_cons = (1.2143*(Time_FIQ203/(etime.getFIQ162()-btime.getFIQ162()+Time_purge_nh3))+(Time_steam_coal/(etime.getFIQ162()-btime.getFIQ162()+Time_purge_nh3))+0);
						 BigDecimal bTon_nh3_cons = new BigDecimal(Ton_nh3_cons);
						 Double eTon_nh3_cons = bTon_nh3_cons.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
						 etime.setTonnh3_compre_consume(eTon_nh3_cons);
					 }	
				 }else{
					 
						//计算的数据
					 //时段FIQ203(Nm3/10min)=1000×(本时刻FIQ203 – 上一时刻FIQ203)
					 double Time_FIQ203= 1000*(etime.getFIQ203()-btime.getFIQ203());
					 etime.setTime_FIQ203(Time_FIQ203);
					 //时段FIQ162(t/10min)=本时刻FIQ162 – 上一时刻FIQ162
					 etime.setTime_FIQ162(0.0);
					 //时段FIQ221A(折标煤)(kgce/10min)
					 double Time_FIQ221A = 98.0020063*(etime.getFIQ221A()-btime.getFIQ221A());
					 BigDecimal bTime_FIQ221A = new BigDecimal(Time_FIQ221A);
					 Double eTime_FIQ221A = bTime_FIQ221A.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
					 etime.setTime_FIQ221A(eTime_FIQ221A);
					 //时段FIQ221B(折标煤)(kgce/10min)
					 double Time_FIQ221B = 98.0020063*(etime.getFIQ221B()-btime.getFIQ221B());
					 BigDecimal bTime_FIQ221B = new BigDecimal(Time_FIQ221B);
					 Double eTime_FIQ221B = bTime_FIQ221B.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
					 etime.setTime_FIQ221B(eTime_FIQ221B);
					 //时段FIQ180(折标煤
					 double Time_FIQ180 = 108.2335278*(etime.getFIQ180()-btime.getFIQ180());
					 BigDecimal bTime_FIQ180 = new BigDecimal(Time_FIQ180);
					 Double eTime_FIQ180 = bTime_FIQ180.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
					 etime.setTime_FIQ180(eTime_FIQ180);
					 // 时段FIQ9802(折标煤)
					 double Time_FIQ9802 = 108.2335278*(etime.getFIQ9802()-btime.getFIQ9802());
					 BigDecimal bTime_FIQ9802 = new BigDecimal(Time_FIQ9802);
					 Double eTime_FIQ9802 = bTime_FIQ9802.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
					 etime.setTime_FIQ9802(eTime_FIQ9802);
					 //时段FIQ9005
					 double Time_FIQ9005 = 132.0027024*(etime.getFIQ9005()-btime.getFIQ9005());
					 BigDecimal bTime_FIQ9005 = new BigDecimal(Time_FIQ9005);
					 Double eTime_FIQ9005 = bTime_FIQ9005.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
					 etime.setTime_FIQ9005(eTime_FIQ9005);
					 //时段蒸汽消耗(折标煤)(kgce/10min)= - 时段FIQ221A(折标煤) +时段FIQ221B(折标煤)+ 时段FIQ180(折标煤) - 时段FIQ9802(折标煤) - 时段FIQ9005(折标煤)
					 double Time_steam_coal = Time_FIQ221A+Time_FIQ221B+Time_FIQ180-Time_FIQ9802-Time_FIQ9005;
					 etime.setTime_steam_coal(Time_steam_coal);
					//时段蒸汽折天然气
					 double Time_steam_gas = Time_steam_coal/1.2143;
					 BigDecimal bTime_steam_gas = new BigDecimal(Time_steam_gas);
					 Double eTime_steam_gas =bTime_steam_gas.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
					 etime.setTime_steam_gas(eTime_steam_gas);
					 //时段气耗合计
					 double Time_gas_sum = Time_FIQ203+Time_steam_gas;
					 BigDecimal bTime_gas_sum = new BigDecimal(Time_gas_sum);
					 Double eTime_gas_sum =bTime_gas_sum.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
					 etime.setTime_gas_sum(eTime_gas_sum);
					 //时段驰放气流量(Nm3/10min)
					 double Time_purge = 1000*(etime.getFIQ153()-btime.getFIQ153());
					if(Time_purge !=0.0){
						etime.setTime_purge(Time_purge);
						 //时段驰放气折氨产量
						 double Time_purge_nh3 =  (0.043*17.031*Time_purge*293.15)/(22.4*273.15*1000);
						 BigDecimal bTime_purge_nh3 = new BigDecimal(Time_purge_nh3);
						 Double eTime_purge_nh3 = bTime_purge_nh3.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
						 etime.setTime_purge_nh3(eTime_purge_nh3);
						 
						 etime.setTime_NH3(0.0+Time_purge_nh3);
						
						 //系统负荷(%)=100×FI100÷30660
						 etime.setSystem_load(100*etime.getFI100()/30660);
						 //小时氨产量(t/h)= 6×时段FIQ162
						 etime.setHour_nh3_yield(6*(0.0));
						 // 小时氨产量(含驰放气折算)(t/h)= 6×时段氨产量(含驰放气折算)
						 etime.setHour_nh3_purge(6*(0.0+Time_purge_nh3));
						 //吨氨天然气耗(Nm3/tNH3)=时段FIQ203÷时段氨产量(含驰放气折算)
						 double Ton_nh3_gas = Time_FIQ203/(0.0+Time_purge_nh3);
						 BigDecimal bTon_nh3_gas = new BigDecimal(Ton_nh3_gas);
						 Double eTon_nh3_gas = bTon_nh3_gas.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
						 etime.setTon_nh3_gas(eTon_nh3_gas);
						//吨氨蒸汽耗(折标煤)(Nm3/tNH3)=时段蒸汽耗(折天然气)÷时段氨产量(含驰放气折算)
						 double Ton_nh3_steam = Time_steam_coal/(0.0+Time_purge_nh3);
						 BigDecimal bTon_nh3_steam = new BigDecimal(Ton_nh3_steam);
						 Double eTon_nh3_steam = bTon_nh3_steam.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
						 etime.setTon_nh3_steam(eTon_nh3_steam);
						
						//吨氨综合消耗(kgce/tNH3)=1.2143×吨氨气耗(合计)
						 double Ton_nh3_cons = 1.2143*((Time_FIQ203/(0.0+Time_purge_nh3))+(Time_steam_coal/(0.0+Time_purge_nh3))+0);
						 BigDecimal bTon_nh3_cons = new BigDecimal(Ton_nh3_cons);
						 Double eTon_nh3_cons = bTon_nh3_cons.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
						 etime.setTonnh3_compre_consume(eTon_nh3_cons);
						
					}else{
						
						etime.setTime_purge(Time_purge);
						 //时段驰放气折氨产量
						 double Time_purge_nh3 =  (0.043*17.031*Time_purge*293.15)/(22.4*273.15*1000);
						 BigDecimal bTime_purge_nh3 = new BigDecimal(Time_purge_nh3);
						 Double eTime_purge_nh3 = bTime_purge_nh3.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
						 etime.setTime_purge_nh3(eTime_purge_nh3);
						 
						 etime.setTime_NH3(0.0+Time_purge_nh3);
						
						 //系统负荷(%)=100×FI100÷30660
						 etime.setSystem_load(100*etime.getFI100()/30660);
						 //小时氨产量(t/h)= 6×时段FIQ162
						 etime.setHour_nh3_yield(6*(0.0));
						 // 小时氨产量(含驰放气折算)(t/h)= 6×时段氨产量(含驰放气折算)
						 etime.setHour_nh3_purge(6*(0.0+Time_purge_nh3));
						 //吨氨天然气耗(Nm3/tNH3)=时段FIQ203÷时段氨产量(含驰放气折算)
						 double Ton_nh3_gas =99999999999999999999.9;
						 BigDecimal bTon_nh3_gas = new BigDecimal(Ton_nh3_gas);
						 Double eTon_nh3_gas = bTon_nh3_gas.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
						 etime.setTon_nh3_gas(eTon_nh3_gas);
						//吨氨蒸汽耗(折标煤)(Nm3/tNH3)=时段蒸汽耗(折天然气)÷时段氨产量(含驰放气折算)
						 double Ton_nh3_steam = 99999999999999999999.9;
						 BigDecimal bTon_nh3_steam = new BigDecimal(Ton_nh3_steam);
						 Double eTon_nh3_steam = bTon_nh3_steam.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
						 etime.setTon_nh3_steam(eTon_nh3_steam);
						
						//吨氨综合消耗(kgce/tNH3)=1.2143×吨氨气耗(合计)
						 double Ton_nh3_cons = 99999999999999999999.9;
						 BigDecimal bTon_nh3_cons = new BigDecimal(Ton_nh3_cons);
						 Double eTon_nh3_cons = bTon_nh3_cons.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
						 etime.setTonnh3_compre_consume(eTon_nh3_cons);
					}
					 
					
				 }
				 
				 
				 jfExcelInputCustomerMapper.saveDatetoHandl1(etime);
				 jfExcelInputCustomerMapper.saveDatetoHandlMiddle(etime);
				 jfExcelInputCustomerMapper.saveDatetoMatlabHandl1(etime);
				 
			 }
		 }
		
	}
	@Override
	public void insertDataToHand2_jf() throws Exception {
		List<JfRawdataHandle2> jfRawdataHandle2s = jfExcelInputCustomerMapper.selectAllHandleMiddle();
		int zrocount = 0;
		int tonnhcount = 0;
		if(jfRawdataHandle2s.size()>0){
			
			/*Double total_Time_FIQ203 = 0.0;
			Double total_Time_FIQ100 = 0.0;
			Double total_Time_FIQ172 = 0.0;
			Double total_Time_FIQ175 = 0.0;
			Double total_Time_fuel_gas = 0.0;
			Double total_Time_FIQ162 = 0.0;
			Double total_ton_nh3_gas_sum = 0.0;*/
			/*for(int j = 0; j<jfRawdataHandle2s.size();j++){
				JfRawdataHandle2 etime = jfRawdataHandle2s.get(j);
				Double Time_FIQ203 = etime.getTime_FIQ203()*1000;
				Double Time_FIQ100 = etime.getTime_FIQ100()*1000;
				Double Time_FIQ172 = etime.getTime_FIQ172();
				Double Time_FIQ175 = etime.getTime_FIQ175();
				Double Time_fuel_gas = etime.getTime_fuel_gas();
				Double Time_FIQ162 = etime.getTime_FIQ162();
				if(Time_FIQ162 < 0.1){
					zrocount++;
				}
				if(Time_FIQ162 > 20){
					zrocount++;
				}
				Double ton_nh3_gas_sum = etime.getTon_nh3_gas_sum();
				if(ton_nh3_gas_sum>2000){
					tonnhcount++;
				}
				if(ton_nh3_gas_sum<2000){
					total_ton_nh3_gas_sum +=ton_nh3_gas_sum;
				}
				
				total_Time_FIQ203 += Time_FIQ203;
				total_Time_FIQ100 += Time_FIQ100;
				total_Time_FIQ172 += Time_FIQ172;
				total_Time_FIQ175 += Time_FIQ175;
				total_Time_fuel_gas += Time_fuel_gas;
				total_Time_FIQ162 += Time_FIQ162;
				
				
				
			}*/
			   /*Double paverage_Time_FIQ203 = total_Time_FIQ203/jfRawdataHandle2s.size();
			    BigDecimal baverage_Time_FIQ203 = new BigDecimal(paverage_Time_FIQ203);
				Double eaverage = baverage_Time_FIQ203.setScale(3,BigDecimal.ROUND_HALF_UP).doubleValue();
	 	      this.average_Time_FIQ203 = eaverage;
	 	      
	 	     Double paverage_Time_FIQ100 = total_Time_FIQ100/jfRawdataHandle2s.size();
			    BigDecimal baverage_Time_FIQ100 = new BigDecimal(paverage_Time_FIQ100);
				Double eaverageFIQ100 = baverage_Time_FIQ100.setScale(3,BigDecimal.ROUND_HALF_UP).doubleValue();
		      this.average_Time_FIQ100 = eaverageFIQ100;
		      
		      Double paverage_Time_FIQ172 = total_Time_FIQ172/jfRawdataHandle2s.size();
			    BigDecimal baverage_Time_FIQ172 = new BigDecimal(paverage_Time_FIQ172);
				Double eaverageFIQ172 = baverage_Time_FIQ172.setScale(3,BigDecimal.ROUND_HALF_UP).doubleValue();
		      this.average_Time_FIQ172 = eaverageFIQ172;
		      
		      Double paverage_Time_FIQ175 = total_Time_FIQ175/jfRawdataHandle2s.size();
			    BigDecimal baverage_Time_FIQ175 = new BigDecimal(paverage_Time_FIQ175);
				Double eaverageFIQ175 = baverage_Time_FIQ175.setScale(3,BigDecimal.ROUND_HALF_UP).doubleValue();
		      this.average_Time_FIQ175 = eaverageFIQ175;
		      
		      Double paverage_Time_fuel_gas = total_Time_fuel_gas/jfRawdataHandle2s.size();
			    BigDecimal baverage_Time_fuel_gas = new BigDecimal(paverage_Time_fuel_gas);
				Double eaverage_fuel_gas = baverage_Time_fuel_gas.setScale(3,BigDecimal.ROUND_HALF_UP).doubleValue();
		      this.average_Time_fuel_gas = eaverage_fuel_gas;
		      
		      Double paverage_Time_FIQ162 = total_Time_FIQ162/(jfRawdataHandle2s.size()-zrocount);
			    BigDecimal baverage_Time_FIQ162 = new BigDecimal(paverage_Time_FIQ162);
				Double eaverageFIQ162 = baverage_Time_FIQ162.setScale(3,BigDecimal.ROUND_HALF_UP).doubleValue();
		      this.average_Time_FIQ162 = eaverageFIQ162;
		      
		      Double paverage_ton_nh3_gas_sum = total_ton_nh3_gas_sum/(jfRawdataHandle2s.size()-tonnhcount);
			    BigDecimal baverage_ton_nh3_gas_sum = new BigDecimal(paverage_ton_nh3_gas_sum);
				Double eaverage_ton_nh3_gas_sum = baverage_ton_nh3_gas_sum.setScale(3,BigDecimal.ROUND_HALF_UP).doubleValue();
		      this.average_ton_nh3_gas_sum = eaverage_ton_nh3_gas_sum;*/
	 	      
	 	      
			if(jfRawdataHandle2s.size()>0){
			
				for(int i = 0; i<jfRawdataHandle2s.size();i++){
					JfRawdataHandle2 etime = jfRawdataHandle2s.get(i);
					if(etime.getTime_FIQ162()>9.45){
						continue;
					}
					if(etime.getTime_FIQ162()<3.5){
						continue;
					}
					if(etime.getTonnh3_compre_consume()>1350){
						continue;
					}
					if(etime.getTonnh3_compre_consume()<700){
						continue;
					}
					/*etime.setFIQ203(etime.getFIQ203()*1000);
					
					etime.setFIQ100(etime.getFIQ100()*1000);
					*//**
					 * 剔除异常数据
					 *//*
					if(etime.getFIQ203()<0){
						continue;
					}
					if(etime.getFIQ100()<0){
						continue;
					}
					if(etime.getFIQ172()<0){
						continue;
					}
					if(etime.getFIQ175()<0){
						continue;
					}
					if(etime.getFIQ162()<0.01){
						continue;
					}
					
					if(etime.getFIQ221A()<0){
						continue;
					}
					if(etime.getFIQ221B()<0){
						continue;
					}
					if(etime.getFIQ180()<0){
						continue;
					}
					if(etime.getFIQ9802()<0){
						continue;
					}
					if(etime.getFIQ9005()<0){
						continue;
					}
					if(etime.getFIQ9803()<0){
						continue;
					}
					if(etime.getFQ116()<0){
						continue;
					}
					if(etime.getTime_FIQ162()<0.1){
						continue;
					}
					if(etime.getTime_FIQ162()>20){
						continue;
					}
					
					if(etime.getTon_nh3_gas_sum()>2000){
						continue;
					}
					double	Time_FIQ203	=	etime.getTime_FIQ203();
					Double aver = Time_FIQ203*1000-average_Time_FIQ203;
			    	aver = new Double(Math.abs(aver.doubleValue()));
					if(aver>average_Time_FIQ203*0.35||Time_FIQ203 == 0){
						continue;
					}
					
					double	Time_FIQ100	=	etime.getTime_FIQ100();
					Double FIQ100_aver = Time_FIQ100*1000-average_Time_FIQ100;
					FIQ100_aver = new Double(Math.abs(FIQ100_aver.doubleValue()));
					if(FIQ100_aver>average_Time_FIQ100*0.35||Time_FIQ100==0){
						continue;
					}
					double	Time_FIQ172	=	etime.getTime_FIQ172();
					Double FIQ172_aver = Time_FIQ172-average_Time_FIQ172;
					FIQ172_aver = new Double(Math.abs(FIQ172_aver.doubleValue()));
					if(FIQ172_aver>average_Time_FIQ172*0.35||Time_FIQ172 == 0){
						continue;
					}
					double	Time_FIQ175	=	etime.getTime_FIQ175();
					Double FIQ175_aver = Time_FIQ175-average_Time_FIQ175;
					FIQ175_aver = new Double(Math.abs(FIQ175_aver.doubleValue()));
					if(FIQ175_aver>average_Time_FIQ175*0.35||Time_FIQ175 == 0){
						continue;
					}
					double	Time_fuel_gas	=	etime.getTime_fuel_gas();
					Double Time_fuel_gas_aver = Time_fuel_gas-average_Time_fuel_gas;
					Time_fuel_gas_aver = new Double(Math.abs(Time_fuel_gas_aver.doubleValue()));
					if(Time_fuel_gas_aver>average_Time_fuel_gas*0.35||Time_fuel_gas == 0){
						continue;
					}
					double	Time_FIQ162	=	etime.getTime_FIQ162();
					Double FIQ162_aver = Time_FIQ162-average_Time_FIQ162;
					FIQ162_aver = new Double(Math.abs(FIQ162_aver.doubleValue()));
					if(FIQ162_aver>average_Time_FIQ162*0.35){
						continue;
					}
					double	ton_nh3_gas_sum	=	etime.getTon_nh3_gas_sum();
					Double ton_nh3_gas_sum_aver = ton_nh3_gas_sum-average_ton_nh3_gas_sum;
					ton_nh3_gas_sum_aver = new Double(Math.abs(ton_nh3_gas_sum_aver.doubleValue()));
					if(ton_nh3_gas_sum_aver>average_ton_nh3_gas_sum*0.35){
						continue;
					}*/
					jfExcelInputCustomerMapper.saveDatetoHandl2(etime);
					jfExcelInputCustomerMapper.saveDatetoMatlabHandl2(etime);
				}
			}
		}
		
	}
	@Override
	public void deleteUploadMiddle_jf() throws Exception {
		jfExcelInputCustomerMapper.deleteUploadMiddle();
	}
	@Override
	public void deleterawdataMiddle_jf() throws Exception {
		jfExcelInputCustomerMapper.deleterawdataMiddle();
	}
	@Override
	public List<JfRawdataHandle1> selectDataForClass_jf(String stime,
			String btime) throws Exception {
				//早班
				List<JfRawdataHandle1> list1 = jfExcelInputCustomerMapper.selectDataByContidionAndClass1(stime, btime); //08:10:00--16:00:00
				List<JfRawdataHandle1> list9 = new ArrayList<JfRawdataHandle1>();
				for(int i = 0; i<list1.size()-1;i++){
					JfRawdataHandle1 jfRawdataHandle1 = list1.get(i);
					JfRawdataHandle1 jfRawdataHandle2 = list1.get(i+1);
					Date jftime = jfRawdataHandle1.getData_time();
					Date jftime2 = jfRawdataHandle2.getData_time();
					long between=(jftime2.getTime()-jftime.getTime())/1000;//除以1000是为了转换成秒
					long day1=between/(24*3600);
					if(day1>1){
						//说明之间有缺失的早班，则添加
						for(int j = 1;j<day1;j++){
							//添加
							JfRawdataHandle1 jf = new JfRawdataHandle1();
							Calendar date1 = Calendar.getInstance();
							date1.setTime(jftime);
							date1.set(Calendar.DATE, date1.get(Calendar.DATE) +j);
							Date date2 = date1.getTime();
							jf.setData_time(date2);
							jf.setTime_FIQ162(0.0);
							jf.setTime_purge_nh3(0.0);
							jf.setTime_FIQ203(0.0);
							jf.setTime_steam_coal(0.0);
							jf.setTime_NH3(0.0);
							
							jf.setShift(0);
							jf.setOrig_id(0);
							jf.setClassNumber(1);
							list9.add(jf);
						}
					}
				}
				list1.addAll(list9);
				//中班
				List<JfRawdataHandle1> list2 = jfExcelInputCustomerMapper.selectDataByContidionAndClass2(stime, btime);// 08:10:00--16:00:00
				
				List<JfRawdataHandle1> list10 = new ArrayList<JfRawdataHandle1>();
				for(int i = 0; i<list2.size()-1;i++){
					JfRawdataHandle1 jfRawdataHandle1 = list2.get(i);
					JfRawdataHandle1 jfRawdataHandle2 = list2.get(i+1);
					
					Date jytime = jfRawdataHandle1.getData_time();
					Date jytime2 = jfRawdataHandle2.getData_time();
					long between=(jytime2.getTime()-jytime.getTime())/1000;//除以1000是为了转换成秒
					long day1=between/(24*3600);
					if(day1>1){
						for(int j = 1;j<day1;j++){
							JfRawdataHandle1 jf = new JfRawdataHandle1();
							Calendar date1 = Calendar.getInstance();
							date1.setTime(jytime);
							date1.set(Calendar.DATE, date1.get(Calendar.DATE) +j);
							Date date2 = date1.getTime();
							jf.setData_time(date2);
							jf.setTime_FIQ162(0.0);
							jf.setTime_purge_nh3(0.0);
							jf.setTime_FIQ203(0.0);
							jf.setTime_steam_coal(0.0);
							jf.setTime_NH3(0.0);
							
							jf.setShift(0);
							jf.setOrig_id(0);
							jf.setClassNumber(2);
							list10.add(jf);
						}
					}
				}
				list2.addAll(list10);
				
				SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				Date evbdate = sdf2.parse(btime);
				Calendar evc = Calendar.getInstance(); 
				evc.setTime(evbdate);  
				evc.set(Calendar.DATE, evc.get(Calendar.DATE) + 1);
		        Date evbdata = evc.getTime();
		        String dayev = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(evbdata);
		        
		        Date mvfdate = sdf2.parse(stime);
				Calendar mvc = Calendar.getInstance(); 
				mvc.setTime(mvfdate);  
				mvc.set(Calendar.DATE, mvc.get(Calendar.DATE) + 1);
		        Date mvbdata = mvc.getTime();
		        String daymv = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(mvbdata);
		        //晚班
				List<JfRawdataHandle1> list4 = jfExcelInputCustomerMapper.selectDataByContidionAndClass2_1(daymv, dayev);//18:10:00--23:29:29
				//中班
				List<JfRawdataHandle1>list3 = jfExcelInputCustomerMapper.selectDataByContidionAndClass3(daymv, dayev);
				
				List<JfRawdataHandle1> list17 = new ArrayList<JfRawdataHandle1>();
				
				if(list4.size()>0){
					for(int i = 0; i <list4.size(); i++){
						JfRawdataHandle1 jy4 = list4.get(i);
						Date date4 = jy4.getData_time();
						Calendar date14 = Calendar.getInstance();
						date14.setTime(date4);
						date14.set(Calendar.DATE, date14.get(Calendar.DATE) - 1);
						Date date24 = date14.getTime();
						jy4.setData_time(date24);
						list17.add(jy4);
					}
				}
				List<JfRawdataHandle1> list11 = new ArrayList<JfRawdataHandle1>();
				for(int i = 0; i<list17.size()-1;i++){
					JfRawdataHandle1 jfRawdataHandle1 = list17.get(i);
					JfRawdataHandle1 jfRawdataHandle2 = list17.get(i+1);
					Date jytime = jfRawdataHandle1.getData_time();
					Date jytime2 = jfRawdataHandle2.getData_time();
					long between=(jytime2.getTime()-jytime.getTime())/1000;//除以1000是为了转换成秒
					long day1=between/(24*3600);
					if(day1>1){
						//说明之间有缺失的晚班，则添加
						for(int j = 1;j<day1;j++){
							//添加
							JfRawdataHandle1 jf = new JfRawdataHandle1();
							Calendar date1 = Calendar.getInstance();
							date1.setTime(jytime);
							date1.set(Calendar.DATE, date1.get(Calendar.DATE) +j);
							Date date2 = date1.getTime();
							jf.setData_time(date2);
							jf.setTime_FIQ162(0.0);
							jf.setTime_purge_nh3(0.0);
							jf.setTime_FIQ203(0.0);
							jf.setTime_steam_coal(0.0);
							jf.setTime_NH3(0.0);
							
							jf.setShift(0);
							jf.setOrig_id(0);
							jf.setClassNumber(2);
							list11.add(jf);
						}
					}
				}
				list17.addAll(list11);
				List<JfRawdataHandle1>list5 = new ArrayList<JfRawdataHandle1>();
				List<JfRawdataHandle1>list6 = new ArrayList<JfRawdataHandle1>();
				if(list3.size()>0){
				for(int i = 0; i <list3.size(); i++){
					JfRawdataHandle1 jy = list3.get(i);
					Date date = jy.getData_time();
					Calendar date1 = Calendar.getInstance();
					date1.setTime(date);
					date1.set(Calendar.DATE, date1.get(Calendar.DATE) - 1);
					Date date2 = date1.getTime();
					jy.setData_time(date2);
					list5.add(jy);
				}
				}
				List<JfRawdataHandle1> list12 = new ArrayList<JfRawdataHandle1>();
				for(int i = 0; i<list5.size()-1;i++){
					JfRawdataHandle1 jyRawdataHandle1 = list5.get(i);
					JfRawdataHandle1 jyRawdataHandle2 = list5.get(i+1);
					Date jytime = jyRawdataHandle1.getData_time();
					Date jytime2 = jyRawdataHandle2.getData_time();
					long between=(jytime2.getTime()-jytime.getTime())/1000;//除以1000是为了转换成秒
					long day1=between/(24*3600);
					if(day1>1){
						for(int j = 1;j<day1;j++){
							JfRawdataHandle1 jf = new JfRawdataHandle1();
							Calendar date1 = Calendar.getInstance();
							date1.setTime(jytime);
							date1.set(Calendar.DATE, date1.get(Calendar.DATE) +j);
							Date date2 = date1.getTime();
							jf.setData_time(date2);
							jf.setTime_FIQ162(0.0);
							jf.setTime_purge_nh3(0.0);
							jf.setTime_FIQ203(0.0);
							jf.setTime_steam_coal(0.0);
							jf.setTime_NH3(0.0);
							
							jf.setShift(0);
							jf.setOrig_id(0);
							jf.setClassNumber(3);
							list12.add(jf);
						}
					}
				}
				list5.addAll(list12);
				
				
				//将两个集合相同就相加list5(输入的时间一天的所有的0点)和list2
				for(JfRawdataHandle1 l1:list17){
					for(JfRawdataHandle1 l2:list2){
						if(l1.getData_time().getTime()==l2.getData_time().getTime()){
							JfRawdataHandle1 jfRawdataHandle1 = new JfRawdataHandle1();
							jfRawdataHandle1.setData_time(l2.getData_time());
							jfRawdataHandle1.setTime_FIQ162(l1.getTime_FIQ162()+l2.getTime_FIQ162());
							jfRawdataHandle1.setTime_purge_nh3(l1.getTime_purge_nh3()+l2.getTime_purge_nh3());
							jfRawdataHandle1.setTime_FIQ203(l1.getTime_FIQ203()+l2.getTime_FIQ203());
							jfRawdataHandle1.setTime_steam_coal(l1.getTime_steam_coal()+l2.getTime_steam_coal());
							jfRawdataHandle1.setTime_NH3(l1.getTime_NH3()+l2.getTime_NH3());
							
							jfRawdataHandle1.setOrig_id(l2.getOrig_id()+l1.getOrig_id());
							jfRawdataHandle1.setClassNumber(l1.getClassNumber());
							jfRawdataHandle1.setShift(l1.getShift()+l2.getShift());
							list6.add(jfRawdataHandle1);
							break;
						}
					}
				}
				for(JfRawdataHandle1 l1:list17){
					for(JfRawdataHandle1 l2:list2){
						if(l1.getData_time().getTime()==l2.getData_time().getTime()){
							list2.remove(l2);
							break;
						}
					}
				}
				list1.addAll(list6);
				list1.addAll(list2);
				list1.addAll(list5);
				Collections.sort(list1,new Comparator<JfRawdataHandle1>() {

					@Override
					public int compare(JfRawdataHandle1 o1, JfRawdataHandle1 o2) {
						if(o1.getData_time().getTime() > o2.getData_time().getTime()){
							return 1;
						}
						if(o1.getData_time().getTime() == o2.getData_time().getTime()){
							return 0;
						}
						
						return -1;
					}
				});
				
				for(int i = 0; i<list1.size();i++){
					JfRawdataHandle1 jf2 = list1.get(0);
					JfRawdataHandle1 jf4 = list1.get(1);
					if(jf2.getClassNumber()==2){
						//说明查询的第一个只有中班，则添加早班
						JfRawdataHandle1 jf3 = new JfRawdataHandle1();
						jf3.setData_time(jf2.getData_time());
						jf3.setTime_FIQ162(0.0);
						jf3.setTime_purge_nh3(0.0);
						jf3.setTime_FIQ203(0.0);
						jf3.setTime_steam_coal(0.0);
						jf3.setTime_NH3(0.0);
					
						jf3.setShift(0);
						jf3.setOrig_id(0);
						jf3.setClassNumber(1);
						list1.add(0, jf3);
					}
					if(jf2.getClassNumber()==3 && jf4.getClassNumber() == 1){
						JfRawdataHandle1 jf5 = new JfRawdataHandle1();
						jf5.setData_time(jf2.getData_time());
						jf5.setTime_FIQ162(0.0);
						jf5.setTime_purge_nh3(0.0);
						jf5.setTime_FIQ203(0.0);
						jf5.setTime_steam_coal(0.0);
						jf5.setTime_NH3(0.0);
						
						jf5.setShift(0);
						jf5.setOrig_id(0);
						jf5.setClassNumber(2);
						list1.add(0, jf5);
					}
				}
				if(list1.size()>0){
					JfRawdataHandle1 jfRawdataHandle1 = list1.get(list1.size()-1);
					int eclassn = jfRawdataHandle1.getClassNumber();
					JfRawdataHandle1 jfRawdataHandle2 = list1.get(list1.size()-2);
					int eclassn2 = jfRawdataHandle2.getClassNumber();
					List<JfRawdataHandle1> qslist = new ArrayList<JfRawdataHandle1>();
					if(eclassn == 3 && eclassn2 == 3){
						
						//只有中班，则添加早班
						//说明查询的第一个只有中班，则添加早班
						JfRawdataHandle1 jf3 = new JfRawdataHandle1();
						jf3.setData_time(jfRawdataHandle1.getData_time());
						jf3.setTime_FIQ162(0.0);
						jf3.setTime_purge_nh3(0.0);
						jf3.setTime_FIQ203(0.0);
						jf3.setTime_steam_coal(0.0);
						jf3.setTime_NH3(0.0);
						
						jf3.setShift(0);
						jf3.setOrig_id(0);
						jf3.setClassNumber(1);
						qslist.add(jf3);
						JfRawdataHandle1 jf4 = new JfRawdataHandle1();
						jf4.setData_time(jfRawdataHandle1.getData_time());
						jf4.setTime_FIQ162(0.0);
						jf4.setTime_purge_nh3(0.0);
						jf4.setTime_FIQ203(0.0);
						jf4.setTime_steam_coal(0.0);
						jf4.setTime_NH3(0.0);
						
						jf4.setShift(0);
						jf4.setOrig_id(0);
						jf4.setClassNumber(2);
						qslist.add(jf4);
						
						qslist.add(jfRawdataHandle1);
					}
					if(qslist.size()>2){
						list1.remove(list1.get(list1.size()-1));
						list1.addAll(qslist);
					}
				}
				
				
				
				Collections.sort(list1,new Comparator<JfRawdataHandle1>() {

					@Override
					public int compare(JfRawdataHandle1 o1, JfRawdataHandle1 o2) {
						if(o1.getData_time().getTime() > o2.getData_time().getTime()){
							return 1;
						}
						if(o1.getData_time().getTime() == o2.getData_time().getTime()){
							return 0;
						}
						
						return -1;
					}
				});
				//求合计
				Double Time_FIQ162_1 = 0.0;
				Double Time_purge_nh3_1 = 0.0;
				Double Time_FIQ203_1 =0.0;
				Double Time_steam_coal_1 = 0.0;
				Double Time_NH3_1 = 0.0;
				Double Time_steam_gas_1 = 0.0;
				Integer jfid_1 = 0;
				
				Double Time_FIQ162_2 = 0.0;
				Double Time_purge_nh3_2 = 0.0;
				Double Time_FIQ203_2 =0.0;
				Double Time_steam_coal_2 = 0.0;
				Double Time_NH3_2 = 0.0;
				Double Time_steam_gas_2 = 0.0;
				Integer jfid_2 = 0;
				
				Double Time_FIQ162_3 = 0.0;
				Double Time_purge_nh3_3 = 0.0;
				Double Time_FIQ203_3 =0.0;
				Double Time_steam_coal_3 = 0.0;
				Double Time_NH3_3 = 0.0;
				Double Time_steam_gas_3 = 0.0;
				Integer jfid_3 = 0;
				
				Double Time_FIQ162_4 = 0.0;
				Double Time_purge_nh3_4 = 0.0;
				Double Time_FIQ203_4 =0.0;
				Double Time_steam_coal_4 = 0.0;
				Double Time_NH3_4 = 0.0;
				Double Time_steam_gas_4 = 0.0;
				Integer jfid_4 = 0;
				
			   
				
				if(list1.size()>0){
					for(int k = 0; k< list1.size(); k++){
						JfRawdataHandle1 jf1 = list1.get(k);
						if(jf1.getOrig_id() !=0){
						if(jf1.getShift()/jf1.getOrig_id()==1){
							if(jf1.getTime_FIQ162() > 0 && jf1.getTime_FIQ162() < 1000){
								Time_FIQ162_1 += jf1.getTime_FIQ162();
								Time_purge_nh3_1 += jf1.getTime_purge_nh3();
								Time_FIQ203_1 +=jf1.getTime_FIQ203();
								Time_steam_coal_1 += jf1.getTime_steam_coal();
								Time_NH3_1 += jf1.getTime_NH3();
								
								jfid_1 += jf1.getOrig_id();
							}
							
							
						}
						if(jf1.getShift()/jf1.getOrig_id()==2){
							if(jf1.getTime_FIQ162() > 0 && jf1.getTime_FIQ162() < 1000){
								Time_FIQ162_2 += jf1.getTime_FIQ162();
								Time_purge_nh3_2 += jf1.getTime_purge_nh3();
								Time_FIQ203_2 +=jf1.getTime_FIQ203();
								Time_steam_coal_2 += jf1.getTime_steam_coal();
								Time_NH3_2 += jf1.getTime_NH3();
							
								jfid_2 += jf1.getOrig_id();
							}
							
						}
						if(jf1.getShift()/jf1.getOrig_id()==3){
							if(jf1.getTime_FIQ162() > 0 && jf1.getTime_FIQ162() < 1000){
								Time_FIQ162_3 += jf1.getTime_FIQ162();
								Time_purge_nh3_3 += jf1.getTime_purge_nh3();
								Time_FIQ203_3 +=jf1.getTime_FIQ203();
								Time_steam_coal_3 += jf1.getTime_steam_coal();
								Time_NH3_3 += jf1.getTime_NH3();
								
								jfid_3 += jf1.getOrig_id();
							}
							
						}
						if(jf1.getShift()/jf1.getOrig_id()==4){
							if(jf1.getTime_FIQ162() > 0 && jf1.getTime_FIQ162() < 1000){
								Time_FIQ162_4 += jf1.getTime_FIQ162();
								Time_purge_nh3_4 += jf1.getTime_purge_nh3();
								Time_FIQ203_4 +=jf1.getTime_FIQ203();
								Time_steam_coal_4 += jf1.getTime_steam_coal();
								Time_NH3_4 += jf1.getTime_NH3();
								
								jfid_4 += jf1.getOrig_id();
							}
							
						}
						}
					}
					JfRawdataHandle1 sunclass1 = new JfRawdataHandle1();
					sunclass1.setTime_FIQ162(Time_FIQ162_1);
					sunclass1.setTime_purge_nh3(Time_purge_nh3_1);
					sunclass1.setTime_FIQ203(Time_FIQ203_1);
					sunclass1.setTime_steam_coal(Time_steam_coal_1);
					sunclass1.setTime_NH3(Time_NH3_1);
					
					sunclass1.setOrig_id(jfid_1);
					sunclass1.setClassNumber(11);
					list1.add(sunclass1);
					JfRawdataHandle1 sunclass2 = new JfRawdataHandle1();
					sunclass2.setTime_FIQ162(Time_FIQ162_2);
					sunclass2.setTime_purge_nh3(Time_purge_nh3_2);
					sunclass2.setTime_FIQ203(Time_FIQ203_2);
					sunclass2.setTime_steam_coal(Time_steam_coal_2);
					sunclass2.setTime_NH3(Time_NH3_1);
					
					sunclass2.setOrig_id(jfid_2);
					sunclass2.setClassNumber(12);
					list1.add(sunclass2);
					JfRawdataHandle1 sunclass3 = new JfRawdataHandle1();
					sunclass3.setTime_FIQ162(Time_FIQ162_3);
					sunclass3.setTime_purge_nh3(Time_purge_nh3_3);
					sunclass3.setTime_FIQ203(Time_FIQ203_3);
					sunclass3.setTime_steam_coal(Time_steam_coal_3);
					sunclass3.setTime_NH3(Time_NH3_3);
					
					sunclass3.setOrig_id(jfid_3);
					sunclass3.setClassNumber(13);
					list1.add(sunclass3);
					JfRawdataHandle1 sunclass4 = new JfRawdataHandle1();
					sunclass4.setTime_FIQ162(Time_FIQ162_4);
					sunclass4.setTime_purge_nh3(Time_purge_nh3_4);
					sunclass4.setTime_FIQ203(Time_FIQ203_4);
					sunclass4.setTime_steam_coal(Time_steam_coal_4);
					sunclass4.setTime_NH3(Time_NH3_4);
					
					sunclass4.setOrig_id(jfid_4);
					sunclass4.setClassNumber(14);
					list1.add(sunclass4);
				}
				
				
				
				return list1;
	}
	private static List<String> getMonthBetween(String minDate, String maxDate) throws Exception {
		    ArrayList<String> result = new ArrayList<String>();
		      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");//格式化为年月
		  
		      Calendar min = Calendar.getInstance();
		      Calendar max = Calendar.getInstance();
		  
		      min.setTime(sdf.parse(minDate));
		      min.set(min.get(Calendar.YEAR), min.get(Calendar.MONTH), 1);
		
		     max.setTime(sdf.parse(maxDate));
		     max.set(max.get(Calendar.YEAR), max.get(Calendar.MONTH), 2);
		 
		     Calendar curr = min;
	     while (curr.before(max)) {
		      result.add(sdf.format(curr.getTime()));
		      curr.add(Calendar.MONTH, 1);
		     }
		 
		     return result;
			   }
	@Override
	public JfRawdataHandle1 getLastTime_jf() throws Exception {
		return jfExcelInputCustomerMapper.getLastTime();
	}
	@Override
	public List<JfRawdataHandle1> selectDataForDayByContidion_jf(String stime,
			String btime) throws Exception {
		//先查询正常时间的
		//List<JfRawdataHandle1> list1 = jfExcelInputCustomerMapper.selectNewDataTwoByContidion(stime, btime);//00:00-8:09时间
		List<JfRawdataHandle1>list1 = jfExcelInputCustomerMapper.selectNewDataOneByContidion(stime, btime);//头天的：8:10——23.59.59
	
		//将开始时间和结束时间个减去一天
		//开始时间
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date newdate = sdf.parse(stime);
		Calendar c = Calendar.getInstance(); 
		c.setTime(newdate);  
		c.set(Calendar.DATE, c.get(Calendar.DATE) + 1);
        Date data2 = c.getTime();
        String dayBefore = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(data2);
        
        //结束时间
        Date newedate = sdf.parse(btime);
		Calendar ce = Calendar.getInstance(); 
		ce.setTime(newedate);  
		ce.set(Calendar.DATE, ce.get(Calendar.DATE) + 1);
        Date data3 = ce.getTime();
        String dayend = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(data3);
        //List<JfRawdataHandle1>list2 = jfExcelInputCustomerMapper.selectNewDataOneByContidion(dayBefore, dayend);//头天的：8:10——23.59.59
        List<JfRawdataHandle1> list2 = jfExcelInputCustomerMapper.selectNewDataTwoByContidion(dayBefore, dayend);//00:00-8:09
        
     
		
		
		
		List<JfRawdataHandle1>list3 = new ArrayList<JfRawdataHandle1>();
		List<JfRawdataHandle1>list6 = new ArrayList<JfRawdataHandle1>();
		if(list2.size()>0){
		for(int i = 0; i <list2.size(); i++){
			
			JfRawdataHandle1 jf = list2.get(i);
			Date date = jf.getData_time();
			Calendar date1 = Calendar.getInstance();
			date1.setTime(date);
			date1.set(Calendar.DATE, date1.get(Calendar.DATE) - 1);
			Date date2 = date1.getTime();
			jf.setData_time(date2);
			list3.add(jf);
		}
		
		//将两个集合相同就相加list5(输入的时间一天的所有的0点)和list2
		for(JfRawdataHandle1 l1:list3){
			for(JfRawdataHandle1 l2:list1){
				if(l1.getData_time().getTime()==l2.getData_time().getTime()){
					JfRawdataHandle1 jfRawdataHandle1 = new JfRawdataHandle1();
					jfRawdataHandle1.setData_time(l2.getData_time());
					jfRawdataHandle1.setTime_FIQ162(l1.getTime_FIQ162()+l2.getTime_FIQ162());
					jfRawdataHandle1.setTime_purge_nh3(l1.getTime_purge_nh3()+l2.getTime_purge_nh3());
					jfRawdataHandle1.setTime_FIQ203(l1.getTime_FIQ203()+l2.getTime_FIQ203());
					jfRawdataHandle1.setTime_steam_coal(l1.getTime_steam_coal()+l2.getTime_steam_coal());
					jfRawdataHandle1.setTime_NH3(l1.getTime_NH3()+l2.getTime_NH3());
					
					jfRawdataHandle1.setOrig_id(l2.getOrig_id()+l1.getOrig_id());
					list6.add(jfRawdataHandle1);
					break;
				}
			}
		}
		for(JfRawdataHandle1 l1:list3){
			for(JfRawdataHandle1 l2:list1){
				if(l1.getData_time().getTime()==l2.getData_time().getTime()){
				     list1.remove(l2);
					break;
				}
			}
		}
		}
		
		list6.addAll(list1);
		Collections.sort(list6,new Comparator<JfRawdataHandle1>() {

			@Override
			public int compare(JfRawdataHandle1 o1, JfRawdataHandle1 o2) {
				if(o1.getData_time().getTime() > o2.getData_time().getTime()){
					return 1;
				}
				if(o1.getData_time().getTime() == o2.getData_time().getTime()){
					return 0;
				}
				
				return -1;
			}
		});
		Double Time_FIQ162_5 = 0.0;
		Double Time_purge_nh3_5 = 0.0;
		Double Time_FIQ203_5 =0.0;
		Double Time_steam_coal_5 = 0.0;
		Double Time_NH3_5 = 0.0;
		Double Time_steam_gas_5 = 0.0;
		Integer jfid_5 = 0;
		
		
		
		if(list6.size()>0){
			for(int k =0;k<list6.size();k++){
				
				JfRawdataHandle1 jf = list6.get(k);
				if(jf.getTime_FIQ162()<6000 && jf.getTime_FIQ162()>0){
					Time_FIQ203_5 +=jf.getTime_FIQ203();
					Time_FIQ162_5 +=jf.getTime_FIQ162();
					Time_purge_nh3_5 +=jf.getTime_purge_nh3();
					Time_steam_coal_5 +=jf.getTime_steam_coal();
					
					Time_NH3_5+=jf.getTime_NH3();
					jfid_5 +=jf.getOrig_id();
				}
				
				
				
			}
			JfRawdataHandle1 sunclass5 = new JfRawdataHandle1();
			sunclass5.setTime_FIQ203(Time_FIQ203_5);
			sunclass5.setTime_FIQ162(Time_FIQ162_5);
			sunclass5.setTime_steam_coal(Time_steam_coal_5);
			
			sunclass5.setTime_purge_nh3(Time_purge_nh3_5);
			sunclass5.setTime_NH3(Time_NH3_5);
			sunclass5.setOrig_id(jfid_5);
			
			list6.add(sunclass5);
		}
		return list6;
	}
	@Override
	public List<JfRawdataHandle1> selectDataForMouthByContidion_jf(String stime,
			String btime) throws Exception {
		//先查询正常时间的
		//List<JfRawdataHandle1> list1 = jfExcelInputCustomerMapper.selectNewDataTwoByContidion(stime, btime);//00:00-8:09时间
		List<JfRawdataHandle1>list1 = jfExcelInputCustomerMapper.selectNewDataOneByContidion(stime, btime);//头天的：8:10——23.59.59
		//将开始时间和结束时间个减去一天
		//开始时间
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date newdate = sdf.parse(stime);
		Calendar c = Calendar.getInstance(); 
		c.setTime(newdate);  
		c.set(Calendar.DATE, c.get(Calendar.DATE) + 1);
        Date data2 = c.getTime();
        String dayBefore = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(data2);
        
        //结束时间
        Date newedate = sdf.parse(btime);
		Calendar ce = Calendar.getInstance(); 
		ce.setTime(newedate);  
		ce.set(Calendar.DATE, ce.get(Calendar.DATE) + 1);
        Date data3 = ce.getTime();
        String dayend = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(data3);
        //List<JfRawdataHandle1>list2 = jfExcelInputCustomerMapper.selectNewDataOneByContidion(dayBefore, dayend);//头天的：8:10——23.59.59
        List<JfRawdataHandle1> list2 = jfExcelInputCustomerMapper.selectNewDataTwoByContidion(dayBefore, dayend);//00:00-8:09
        
        
		
		
		
		List<JfRawdataHandle1>list3 = new ArrayList<JfRawdataHandle1>();
		List<JfRawdataHandle1>list6 = new ArrayList<JfRawdataHandle1>();
		if(list2.size()>0){
		for(int i = 0; i <list2.size(); i++){
			
			JfRawdataHandle1 jf = list2.get(i);
			Date date = jf.getData_time();
			Calendar date1 = Calendar.getInstance();
			date1.setTime(date);
			date1.set(Calendar.DATE, date1.get(Calendar.DATE) - 1);
			Date date2 = date1.getTime();
			jf.setData_time(date2);
			list3.add(jf);
		}
		
		//将两个集合相同就相加list5(输入的时间一天的所有的0点)和list2
		for(JfRawdataHandle1 l1:list3){
			for(JfRawdataHandle1 l2:list1){
				if(l1.getData_time().getTime()==l2.getData_time().getTime()){
					JfRawdataHandle1 jfRawdataHandle1 = new JfRawdataHandle1();
					jfRawdataHandle1.setData_time(l2.getData_time());
					jfRawdataHandle1.setTime_FIQ162(l1.getTime_FIQ162()+l2.getTime_FIQ162());
					jfRawdataHandle1.setTime_purge_nh3(l1.getTime_purge_nh3()+l2.getTime_purge_nh3());
					jfRawdataHandle1.setTime_FIQ203(l1.getTime_FIQ203()+l2.getTime_FIQ203());
					jfRawdataHandle1.setTime_steam_coal(l1.getTime_steam_coal()+l2.getTime_steam_coal());
					jfRawdataHandle1.setTime_NH3(l1.getTime_NH3()+l2.getTime_NH3());
					
					jfRawdataHandle1.setOrig_id(l2.getOrig_id()+l1.getOrig_id());
					list6.add(jfRawdataHandle1);
					break;
				}
			}
		}
		for(JfRawdataHandle1 l1:list3){
			for(JfRawdataHandle1 l2:list1){
				if(l1.getData_time().getTime()==l2.getData_time().getTime()){
				     list1.remove(l2);
					break;
				}
			}
		}
		}
		
		list6.addAll(list1);
		Collections.sort(list6,new Comparator<JfRawdataHandle1>() {

			@Override
			public int compare(JfRawdataHandle1 o1, JfRawdataHandle1 o2) {
				if(o1.getData_time().getTime() > o2.getData_time().getTime()){
					return 1;
				}
				if(o1.getData_time().getTime() == o2.getData_time().getTime()){
					return 0;
				}
				
				return -1;
			}
		});
		Double Time_FIQ162_5 = 0.0;
		Double Time_purge_nh3_5 = 0.0;
		Double Time_FIQ203_5 =0.0;
		Double Time_steam_coal_5 = 0.0;
		Double Time_NH3_5 = 0.0;
		Double Time_steam_gas_5 = 0.0;
		Integer jfid_5 = 0;
		
		
		
		if(list6.size()>0){
			for(int k =0;k<list6.size();k++){
				JfRawdataHandle1 jf = list6.get(k);
				if(jf.getTime_FIQ162()<6000 && jf.getTime_FIQ162()>0){
					Time_FIQ203_5 +=jf.getTime_FIQ203();
					Time_FIQ162_5 +=jf.getTime_FIQ162();
					Time_purge_nh3_5 +=jf.getTime_purge_nh3();
					Time_steam_coal_5 +=jf.getTime_steam_coal();
					
					Time_NH3_5+=jf.getTime_NH3();
					jfid_5 +=jf.getOrig_id();
				}
				
				
				
			}
			JfRawdataHandle1 sunclass5 = new JfRawdataHandle1();
			sunclass5.setTime_FIQ203(Time_FIQ203_5);
			sunclass5.setTime_FIQ162(Time_FIQ162_5);
			sunclass5.setTime_steam_coal(Time_steam_coal_5);
			
			sunclass5.setTime_purge_nh3(Time_purge_nh3_5);
			sunclass5.setTime_NH3(Time_NH3_5);
			sunclass5.setOrig_id(jfid_5);
			
			list6.add(sunclass5);
		}
		
		
		
		return list6;
	}
	@Override
	public List<JfRawdataHandle1> selectDataForQuarterByContidion_jf(String stime,
			String btime) throws Exception {
			//第一步：统计每个月的8：09-23：59：
			//第二步统计每个月的00：00-8：01
			//第三步，日期相同就累加
			//第四步：将输入时间加一个月后，查询每个月第一天的00：00-8：01
			//第五步：将第四步中的数据日期减一个月，与一二步中相同就加上
			//第六步将查询每个月的的第一天的00：00-8：01
			//第七步，将查询结果时间相同就相减
			List<JfRawdataHandle1>list1 = jfExcelInputCustomerMapper.selectNewDataOneByQuarter(stime, btime);
			List<JfRawdataHandle1>list2 = jfExcelInputCustomerMapper.selectNewDataTwoByQuarter(stime, btime);
			for(JfRawdataHandle1 l1:list1){
				for(JfRawdataHandle1 l2:list2){
					Date l1time = l1.getData_time();
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
					String lintime = sdf.format(l1time);
					Date listNextTime = l2.getData_time();
					String liNeTime = sdf.format(listNextTime);
					
					if(lintime.equals(liNeTime)){
						l1.setData_time(l1.getData_time());
						l1.setTime_FIQ162(l1.getTime_FIQ162()+l2.getTime_FIQ162());
						l1.setTime_purge_nh3(l1.getTime_purge_nh3()+l2.getTime_purge_nh3());
						l1.setTime_FIQ203(l1.getTime_FIQ203()+l2.getTime_FIQ203());
						l1.setTime_steam_coal(l1.getTime_steam_coal()+l2.getTime_steam_coal());
						l1.setTime_NH3(l1.getTime_NH3()+l2.getTime_NH3());
					
						l1.setOrig_id(l2.getOrig_id()+l1.getOrig_id());
						break;
					}
				}
			}
			//得到用户输入的时间区域中有哪些月份
			List<String> Utime = this.getMonthBetween(stime, btime);
			List<JfRawdataHandle1>list3 = new ArrayList<JfRawdataHandle1>();
			List<JfRawdataHandle1>list4 = new ArrayList<JfRawdataHandle1>();
			
			//查询下一个月月份的00：00：00-8：00：00的数据
			for(int i =0;i<Utime.size();i++){
				String time = Utime.get(i);
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
				Date userDate = sdf.parse(time);
				Calendar calendar = Calendar.getInstance();
				calendar.setTime(userDate); 
				calendar.add(Calendar.MONTH, +1);
				Date newDate = calendar.getTime();
				String rtime = sdf.format(newDate);	
				String betime = rtime+"-01 00:00:00";
				String entime = rtime+"-01 23:59:59";
				JfRawdataHandle1 jfRawdataHandle1 = jfExcelInputCustomerMapper.selectNewDatathreeByQuarter(betime, entime);
				if(jfRawdataHandle1 != null){
				list3.add(jfRawdataHandle1);
				}
			}
			for(int i =0;i<Utime.size();i++){
				String time = Utime.get(i);
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
				Date userDate = sdf.parse(time);
				Calendar calendar = Calendar.getInstance();
				calendar.setTime(userDate); 
				calendar.add(Calendar.MONTH, +0);
				Date newDate = calendar.getTime();
				String rtime = sdf.format(newDate);	
				String betime = rtime+"-01 00:00:00";
				String entime = rtime+"-01 23:59:59";
				JfRawdataHandle1 jfRawdataHandle1 = jfExcelInputCustomerMapper.selectNewDatathreeByQuarter(betime, entime);
				if(jfRawdataHandle1 != null){
				list4.add(jfRawdataHandle1);
				}
			}
				for(JfRawdataHandle1 l1:list1){
					for(JfRawdataHandle1 l2:list3){
						Date l1time = l1.getData_time();
						SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
						String lintime = sdf.format(l1time);
						
						Date listNextTime = l2.getData_time();
						Calendar calendar = Calendar.getInstance();
						calendar.setTime(listNextTime); 
						calendar.add(Calendar.MONTH, -1);
						Date newDate = calendar.getTime();
						String liNeTime = sdf.format(newDate);
						
						if(lintime.equals(liNeTime)){
							l1.setData_time(l1.getData_time());
							l1.setTime_FIQ162(l1.getTime_FIQ162()+l2.getTime_FIQ162());
							l1.setTime_purge_nh3(l1.getTime_purge_nh3()+l2.getTime_purge_nh3());
							l1.setTime_FIQ203(l1.getTime_FIQ203()+l2.getTime_FIQ203());
							l1.setTime_steam_coal(l1.getTime_steam_coal()+l2.getTime_steam_coal());
							l1.setTime_NH3(l1.getTime_NH3()+l2.getTime_NH3());
							
							l1.setOrig_id(l2.getOrig_id()+l1.getOrig_id());
							break;
						}
					}
				}
				for(JfRawdataHandle1 l1:list1){
					for(JfRawdataHandle1 l2:list4){
						Date l1time = l1.getData_time();
						SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
						String lintime = sdf.format(l1time);
						Date listNextTime = l2.getData_time();
						Calendar calendar = Calendar.getInstance();
						calendar.setTime(listNextTime); 
						calendar.add(Calendar.MONTH, -0);
						Date newDate = calendar.getTime();
						
						String liNeTime = sdf.format(newDate);
						
						
						if(lintime.equals(liNeTime)){
							l1.setData_time(l1.getData_time());
							l1.setTime_FIQ162(l1.getTime_FIQ162()-l2.getTime_FIQ162());
							l1.setTime_purge_nh3(l1.getTime_purge_nh3()-l2.getTime_purge_nh3());
							l1.setTime_FIQ203(l1.getTime_FIQ203()-l2.getTime_FIQ203());
							l1.setTime_steam_coal(l1.getTime_steam_coal()-l2.getTime_steam_coal());
							l1.setTime_NH3(l1.getTime_NH3()-l2.getTime_NH3());
							
							l1.setOrig_id(l1.getOrig_id()-l2.getOrig_id());
							
							break;
						}
					}
				}
				
			
				
				Collections.sort(list1,new Comparator<JfRawdataHandle1>() {

					@Override
					public int compare(JfRawdataHandle1 o1, JfRawdataHandle1 o2) {
						if(o1.getData_time().getTime() > o2.getData_time().getTime()){
							return 1;
						}
						if(o1.getData_time().getTime() == o2.getData_time().getTime()){
							return 0;
						}
						
						return -1;
					}
				});
				if(list1.size()>0){
					Double Time_FIQ162_7 = 0.0;
					Double Time_purge_nh3_7 = 0.0;
					Double Time_FIQ203_7 =0.0;
					Double Time_steam_coal_7 = 0.0;
					Double Time_NH3_7 = 0.0;
					Double Time_steam_gas_7 = 0.0;
					Integer jfid_7 = 0;
					for(int i = 0; i < list1.size();i++){
						JfRawdataHandle1 jf1 = list1.get(i);
						Time_FIQ162_7 += jf1.getTime_FIQ162();
						Time_purge_nh3_7 += jf1.getTime_purge_nh3();
						Time_FIQ203_7 +=jf1.getTime_FIQ203();
						Time_steam_coal_7 += jf1.getTime_steam_coal();
						Time_NH3_7 += jf1.getTime_NH3();
						
						jfid_7 += jf1.getOrig_id();
					}
					JfRawdataHandle1 sunclass7 = new JfRawdataHandle1();
					sunclass7.setTime_FIQ162(Time_FIQ162_7);
					sunclass7.setTime_purge_nh3(Time_purge_nh3_7);
					sunclass7.setTime_FIQ203(Time_FIQ203_7);
					sunclass7.setTime_steam_coal(Time_steam_coal_7);
					sunclass7.setTime_NH3(Time_NH3_7);
					
					sunclass7.setOrig_id(jfid_7);
					list1.add(sunclass7);
				}
				
				
				return list1;

	}
	@Override
	public List<JbUserifo> selectAllUser_jf() throws Exception {
		return jfExcelInputCustomerMapper.selectAlljbUser();
	}
	@Override
	public void updatePassword_jf(JbUserifo jbUserifo) throws Exception {
		jfExcelInputCustomerMapper.updateJFPassInfo(jbUserifo);
	}
	@Override
	public void saveCopyAs(String xlsfile, String saveAsFile) throws Exception {
		SheetCopy sc = new SheetCopy();
		sc.setXlsfile(xlsfile);
		sc.setSaveAsFile(saveAsFile);
		Thread t = new Thread(sc,"sc"+System.currentTimeMillis());
		Thread tmain = Thread.currentThread();
		try{
			t.start();
			while(sc.getIsContinue() != 1){
				tmain.sleep(100);
			}
		}catch (Exception e) {
			e.printStackTrace();
		}finally{
			t.stop();
		}
	}
	
	//判断时间是否在区间里面
		public static boolean isInTime(String sourceTime, String curTime) {
		    if (sourceTime == null || !sourceTime.contains("-") || !sourceTime.contains(":")) {
		        throw new IllegalArgumentException("Illegal Argument arg:" + sourceTime);
		    }
		    if (curTime == null || !curTime.contains(":")) {
		        throw new IllegalArgumentException("Illegal Argument arg:" + curTime);
		    }
		    String[] args = sourceTime.split("-");
		    SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
		    try {
		        long now = sdf.parse(curTime).getTime();
		        long start = sdf.parse(args[0]).getTime();
		        long end = sdf.parse(args[1]).getTime();
		        if (args[1].equals("00:00")) {
		            args[1] = "24:00";
		        }
		        if (end < start) {
		            if (now >= end && now < start) {
		                return false;
		            } else {
		                return true;
		            }
		        } 
		        else {
		            if (now >= start && now < end) {
		                return true;
		            } else {
		                return false;
		            }
		        }
		    } catch (ParseException e) {
		        e.printStackTrace();
		        throw new IllegalArgumentException("Illegal Argument arg:" + sourceTime);
		    }

		}
		@Override
		public List<JfRawdataHandle1> selectclass_1(String stime, String btim)
				throws Exception {
			//将开始时间减一天取7：55到最后一天的7：50
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date newdate = sdf.parse(stime);
			Calendar c = Calendar.getInstance(); 
			c.setTime(newdate);  
			c.set(Calendar.DATE, c.get(Calendar.DATE) - 0);
	        Date data2 = c.getTime();
	        String dayBefore = new SimpleDateFormat("yyyy-MM-dd").format(data2);
	        dayBefore = dayBefore+" 8:05:00";
	        
	        Date newedate = sdf.parse(btim);
			Calendar ce = Calendar.getInstance(); 
			ce.setTime(newedate);  
			ce.set(Calendar.DATE, ce.get(Calendar.DATE) + 1);
	        Date data3 = ce.getTime();
	        String dayend = new SimpleDateFormat("yyyy-MM-dd").format(data3);
	        dayend = dayend+" 8:05:00";
			
	        List<JfRawdataHandle1> class1 = jfExcelInputCustomerMapper.selectclass_1(dayBefore, dayend, "1");
	        List<JfRawdataHandle1> class2 = jfExcelInputCustomerMapper.selectclass_1(dayBefore, dayend, "2");
	        List<JfRawdataHandle1> class3 = jfExcelInputCustomerMapper.selectclass_1(dayBefore, dayend, "3");
	        List<JfRawdataHandle1> class4 = jfExcelInputCustomerMapper.selectclass_1(dayBefore, dayend, "4");
	        System.out.println(class1.size()+"=============="+class2.size()+"======"+class3.size()+"===="+class4.size());
	        List<JfRawdataHandle1> list = new ArrayList<JfRawdataHandle1>();
	        list.addAll(class1);
	        list.addAll(class2);
	        list.addAll(class3);
	        list.addAll(class4);

			return list;
		}
		
		
}
