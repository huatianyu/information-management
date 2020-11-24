import Entity from '../entity'


export default  class  TargetListDto {
    planningDesignOrderId: Number;
    targetname: string;
    fulldose: Number;
    fractionaldose: Number;
    frequency: Number;
    volume: Number;
    id: Number;
    irradiationPosition:Number =0;

}
