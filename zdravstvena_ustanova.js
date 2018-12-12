class Doktor {
    constructor(ime, prezime, specijalnost){
        this.ime = ime;
        this.prezime = prezime;
        this.specijalnost = specijalnost;
        this.pacijenti = [];
        console.log(datumText + 'Kreiran doktor ' + this.ime);
    }
    dodajPacijenta(pacijent){
        //console.log(this);
        this.pacijenti.push(pacijent);
    }
    zakaziPregled(pacijent, tip){
        var today = new Date();
        pacijent.pregled = new Pregled(tip, today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear());
    }

}
class Pacijent {
    constructor(ime, prezime, jmbg, karton, doktor){
        this.ime = ime;
        this.prezime = prezime;
        this.jmbg = jmbg;
        this.karton = karton;
        this.doktor;
        if(doktor) {
            this.doktor = doktor;
            doktor.dodajPacijenta(this);
        }
        this.pregled = 0;
        this.rezultati = [];
        
        console.log(datumText + 'Kreiran pacijent ' + this.ime);
    }
    odradiPregled(tip){ 

        if (this.pregled.tip == tip & tip == 1){
            this.rezultati.push(new Pritisak(Math.floor(Math.random() * 30) + 110, Math.floor(Math.random() * 20) + 70, Math.floor(Math.random() * 40) + 60));
        } else if(this.pregled.tip == tip & tip == 2) {
            this.rezultati.push(new Secer(Math.random() * (3 - 6) + 6, "9:00"));
        } else if(this.pregled.tip == tip & tip == 3) {
            this.rezultati.push(new Holesterol(Math.random() * (1 - 3) + 3, "9:00"));
        } else {
            console.log('Pacijent ' + this.ime + ' nema zakazan pregled!');
            return;
        }
        this.pregled.tip = 0;
        console.log(datumText + 'Pacijent ' + this.ime + ' odradio pregled.');
    }
    izaberiDoktora(doktor){
        if(this.doktor){ // U slucaju da vec ima doktora prvo obrisi sebe iz njegove liste pacijenata
            for(var i = 0; i < this.doktor.pacijenti.length; i++){
                if(this.doktor.pacijenti[i] == this){
                    this.doktor.pacijenti.splice(i, 1);
                }
            }
        }
        this.doktor = doktor;
        doktor.dodajPacijenta(this);
        console.log(datumText + 'Pacijent ' + this.ime + ' izabrao doktora: ' + doktor.ime);
    }
}
class Pritisak {
    constructor(gornji, donji, puls){
        this.gornji = gornji;
        this.donji = donji;
        this.puls = puls;
    }
}
class Secer {
    constructor(vrednost, poslednjiObrok){
        this.vrednost = vrednost;
        this.poslednjiObrok = poslednjiObrok;
    }
}
class Holesterol {
    constructor(vrednost, poslednjiObrok){
        this.vrednost = vrednost;
        this.poslednjiObrok = poslednjiObrok;
    }
}
class Pregled {
    constructor(tip, datum){
        this.tip = tip;
        this.datum = datum;
    }
}
var datum = new Date();
var datumText = '[' + datum.getFullYear() +
'.' + datum.getMonth() + 
'.' + datum.getDay() + 
' ' + datum.getHours() + 
':' + datum.getMinutes() + 
':' + datum.getSeconds() + 
']';
doktor = new Doktor("Milan", "Milinkovic", "Neurolog");
pacijent1 = new Pacijent("Dragan", "Zivkovic", "123456789", "234");
pacijent1.izaberiDoktora(doktor);
doktor.zakaziPregled(pacijent1, 2);
pacijent1.odradiPregled(2);
pacijent1.odradiPregled(1);


console.log(pacijent1);
console.log(doktor);