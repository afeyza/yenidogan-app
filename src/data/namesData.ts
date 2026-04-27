export interface NameItem {
  id: number;
  n: string;
  g: 'Kız' | 'Erkek';
  t1: string;
  t2: string;
  t3: string;
  m: string;
  desc?: string;
}

export const namesData: NameItem[] = [
  { id: 1, n: "Aylin", g: "Kız", t1: "Kız ismi", t2: "Popüler", t3: "Türkçe", m: "Ayın etrafını saran hale anlamına gelir. Türkçe kökenli, şiirsel ve zarif bir isimdir." },
  { id: 2, n: "Miraç", g: "Erkek", t1: "Erkek ismi", t2: "Dini", t3: "Arapça", m: "Hz. Muhammed'in göğe yükselişini ifade eden Arapça kökenli, maneviyatı yüksek bir isimdir." },
  { id: 3, n: "Defne", g: "Kız", t1: "Kız ismi", t2: "Doğa", t3: "Türkçe", m: "Defne bitkisinin adından gelen, zafer ve şeref simgesi olan, doğa temalı güzel bir isimdir." },
  { id: 4, n: "Kaan", g: "Erkek", t1: "Erkek ismi", t2: "Güçlü", t3: "Türkçe", m: "Hükümdar, han anlamına gelen Türkçe kökenli güçlü bir isimdir." },
  { id: 5, n: "İrem", g: "Kız", t1: "Kız ismi", t2: "Popüler", t3: "Arapça", m: "Cennet bahçesi anlamına gelen, Arapça kökenli hoş bir isimdir." },
  { id: 6, n: "Alp", g: "Erkek", t1: "Erkek ismi", t2: "Nadir", t3: "Türkçe", m: "Yiğit, cesur, kahraman anlamına gelen saf Türkçe bir isimdir." },
  { id: 7, n: "Nisan", g: "Kız", t1: "Kız ismi", t2: "Mevsim", t3: "Türkçe", m: "İlkbaharın güzel ayı, yağmur ve tazelik simgesi bir isimdir." },
  { id: 8, n: "Efe", g: "Erkek", t1: "Erkek ismi", t2: "Popüler", t3: "Türkçe", m: "Ege bölgesinde yiğit, kabadayı anlamında güçlü ve tarihi bir isimdir.", desc: "Ege bölgesinde yiğit, kabadayı anlamında..." },
  { id: 9, n: "Berkay", g: "Erkek", t1: "Erkek ismi", t2: "Güçlü", t3: "Arapça", m: "Arapça kökenli sağlam ve güçlü anlamına gelen etkileyici bir isimdir.", desc: "Arapça kökenli sağlam ve güçlü anlamı..." },
  { id: 10, n: "Zeynep", g: "Kız", t1: "Kız ismi", t2: "Popüler", t3: "Arapça", m: "Güzel kokulu çiçek, babanın süsü anlamında klasik ve zarif bir isimdir.", desc: "Güzel kokulu çiçek, babanın süsü anlamında..." },
  { id: 11, n: "Yusuf", g: "Erkek", t1: "Erkek ismi", t2: "Dini", t3: "İbranice", m: "İbranice kökenli, Allah artırsın inleyen, temizliği ve güzelliği simgeleyen isimdir.", desc: "İbranice kökenli, Allah artırsın anlamında..." },
];

export const popularNameIds = [8, 9, 10, 11];
