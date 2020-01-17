export class Computer{
    constructor   (serialNumber, model, cpu, ram, hdd, ssd){
        this.serialNumber = serialNumber;
        this.model = model;
        this.cpu = cpu;
        this.ram = ram;
        this.hdd = hdd;
        this.ssd = ssd;
    }
    showComputer(){
        return "" + this.serialNumber +" "+ this.model +" "+ this.cpu +" "+
         this.ram +" "+ this.hdd +" "+ this.ssd
    }
}
