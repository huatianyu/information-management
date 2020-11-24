import Entity from '../entity'


export default  class   Chest {
    irradiationPosition:Number=1;
    imperilListDto: ImperilListDto[] = [];
    targetListDto: TargetListDto[] = [];
}

class ImperilListDto {
    planningDesignOrderId: Number ;
    imperilorganname: string;
    limiteddosevolume: Number;
    limiteddose: Number;
    id: Number;
    irradiationPosition:Number = 1;

//     planningDesignOrderId: Number = 1;
//     imperilorganname: string = "1";
//     limiteddosevolume: Number = 1;
//     limiteddose: Number = 1;
//     id: Number = 1;
}



class TargetListDto {
    planningDesignOrderId: Number;
    targetname: string;
    fulldose: Number;
    fractionaldose: Number;
    frequency: Number;
    volume: Number;
    id: Number;
    irradiationPosition:Number = 1;

    // planningDesignOrderId: Number = 1;
    // targetname: string = "1";
    // fulldose: Number = 1;
    // fractionaldose: Number = 1;
    // frequency: Number = 1;
    // volume: Number = 1;
    // id: Number = 1;
}
