import Entity from '../entity'


export default class Header {
    irradiationPosition: Number = 0;
    imperilListDto: ImperilListDto[] = [new ImperilListDto(), new ImperilListDto(), new ImperilListDto()];
    targetListDto: TargetListDto[] = [new TargetListDto(), new TargetListDto(), new TargetListDto()];
}

class ImperilListDto {
    planningDesignOrderId: Number;
    imperilorganname: string;
    limiteddosevolume: Number;
    limiteddose: Number;
    id: Number;
    irradiationPosition: Number = 0;


}



class TargetListDto {
    planningDesignOrderId: Number;
    targetname: string;
    fulldose: Number;
    fractionaldose: Number;
    frequency: Number;
    volume: Number;
    id: Number;
    irradiationPosition: Number = 0;

}
