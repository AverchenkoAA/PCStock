export function computer({serialNumber, model, cpu, ram, hdd, ssd}){
    this.serialNumber = serialNumber;
    this.model = model;
    this.cpu = cpu;
    this.ram = ram;
    this.hdd = hdd;
    this.ssd = ssd;
    this.showComputer = showComputer;
}

export function showComputer(){
    return "" + this.serialNumber +" "+ this.model +" "+ this.cpu +" "+
    this.ram +" "+ this.hdd +" "+ this.ssd;
}

