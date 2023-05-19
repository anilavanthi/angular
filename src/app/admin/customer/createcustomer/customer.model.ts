import { formatDate } from '@angular/common';
export class Customer {
  id: number;
  img: string;
  fname: string;
  surname: string;
  gender: string;
  email: string;
  mobile: string;
  aadhar:string;
  dob:string;
  birth:string;
  religion:string;
  caste:string;
  star:string;
  subcaste:string;
  rasi:string;
  paadam:string;
  gothram:string;
  dosham:string;
  height:string;
  blood:string;
  tongue:string;
  health:string;
  complex:string;
  marital:string;
  smoke:string;
  drink:string;
  food:string;
  address:string;
  hobbies:string;
  interest:string;
  music:string;
  sports:string;
  altmobile:string;
  altemail:string;
  altaddress:string;
  cuisine:string;
  reads:string;
  movies:string;
  style:string;
  spoken:string;
  country:string;
  state:string;
  district:string;
  city:string;
  appl:string;
  source:string;
  looking:string;
  age:string;
  status:string;
  education:string;
  profession:string;
  universe:string;
  emply:string;
  design:string;
  work:string;
  property:string;
  annual:string;
  fathername:string;
  freligion:string;
  fcaste:string;
  isconvert:string;
  fatherstatus:string;
  pension:string;
  mname:string;
  maidenname:string;
  mreligion:string;
  mcaste:string;
  mconvert:string;
  peraddress:string;
  presentaddress:string;
  motherstat:string;
  brothers:string;
  sisters:string;
  refname:string;
  refmobile:string;
  refaddress:string;
  plooking:string;
  pheight:string;
  pfstatus:string;
  pintercaste:string;
  khujadosham:string;
  complexion:string;
  pprofession:string;
  passport:string;
  psmoke:string;
  pdrink:string;
  peducation:string;
  near:string;
  ftype:string;
  fstatus:string;
  department:string;
  uploadFile:string;
  
  constructor(customer: Customer) {
    {
      this.id = customer.id || this.getRandomID();
      this.img = customer.img || 'assets/images/user/user1.jpg';
      this.fname = customer.fname || '';
      this.surname = customer.surname || '';
      this.gender = customer.gender || '';
      this.email = customer.email || '';
      this.mobile = customer.mobile || '';
      this.aadhar = customer.aadhar || '';
      this.dob = customer.dob || '';
      this.birth = customer.birth || '';
      this.religion = customer.religion || '';
      this.caste = customer.caste || '';
      this.star = customer.star || '';
      this.subcaste = customer.subcaste || '';
      this.rasi = customer.rasi || '';
      this.paadam = customer.paadam || '';
      this.gothram = customer.gothram || '';
      this.dosham = customer.dosham || '';
      this.height = customer.height || '';
      this.blood = customer.blood || '';
      this.tongue = customer.tongue || '';
      this.health = customer.health || '';
      this.complex = customer.complex || '';
      this.marital = customer.marital || '';
      this.smoke = customer.smoke || '';
      this.drink = customer.drink || '';
      this.food = customer.food || '';
      this.address = customer.address || '';
      this.hobbies = customer.hobbies || '';
      this.interest = customer.interest || '';
      this.music = customer.music || '';
      this.sports = customer.sports || '';
      this.altmobile = customer.altmobile || '';
      this.altemail = customer.altemail || '';
      this.altaddress = customer.altaddress || '';
      this.cuisine = customer.cuisine || '';
      this.reads = customer.reads || '';
      this.movies = customer.movies || '';
      this.style = customer.style || '';
      this.spoken = customer.spoken || '';
      this.country = customer.country || '';
      this.state = customer.state || '';
      this.district = customer.district || '';
      this.city = customer.city || '';
      this.appl = customer.appl || '';
      this.source = customer.source || '';
      this.looking = customer.looking || '';
      this.age = customer.age || '';
      this.status = customer.status || '';
      this.education = customer.education || '';
      this.profession = customer.profession || '';
      this.universe = customer.universe || '';
      this.emply = customer.emply || '';
      this.design = customer.design || '';
      this.work = customer.work || '';
      this.property = customer.property || '';
      this.annual = customer.annual || '';
      this.fathername = customer.fathername || '';
      this.freligion = customer.freligion || '';
      this.fcaste = customer.fcaste || '';
      this.isconvert = customer.isconvert || '';
      this.fatherstatus = customer.fatherstatus || '';
      this.pension = customer.pension || '';
      this.mname = customer.mname || '';
      this.maidenname = customer.maidenname || '';
      this.mreligion = customer.mreligion || '';
      this.mcaste = customer.mcaste || '';
      this.mconvert = customer.mconvert || '';
      this.peraddress = customer.peraddress || '';
      this.presentaddress = customer.presentaddress || '';
      this.motherstat = customer.motherstat || '';
      this.brothers = customer.brothers || '';
      this.sisters = customer.sisters || '';
      this.refname = customer.refname || '';
      this.refmobile = customer.refmobile || '';
      this.refaddress = customer.refaddress || '';
      this.plooking = customer.plooking || '';
      this.pheight = customer.pheight || '';
      this.pfstatus = customer.pfstatus || '';
      this.pintercaste = customer.pintercaste || '';
      this.khujadosham = customer.khujadosham || '';
      this.complexion = customer.complexion || '';
      this.pprofession = customer.pprofession || '';
      this.passport = customer.passport || '';
      this.psmoke = customer.psmoke || '';
      this.pdrink = customer.pdrink || '';
      this.peducation = customer.peducation || '';
      this.near = customer.near || '';
      this.ftype = customer.ftype || '';
      this.fstatus = customer.fstatus || '';
      this.department = customer.department || '';
      this.uploadFile = customer.uploadFile || '';
      
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}