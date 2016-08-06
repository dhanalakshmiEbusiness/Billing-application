/**
 * Created by Suhas on 7/21/2016.
 */
var constants = {
        LOADING_OCCUPANCY:{
                LANE_INDEX_MAPPING:{
                        'red':1,
                        'blue':2,
                        'green':3
                },
                BERTH_ROUTE_NUMBER :[
                        ['902','161','168'],
                        ['858','969','903/903P'],
                        ['965','900/900A','169'],
                        ['962','912','901'],
                        ['926/964','913','911'],
                        ['178/178A','912/912W','913'],
                        ['961','960','911'],
                        ['187','963','966'],
                        ['925','856','950']
                ],
                ELDERLY_QUEUE_AREA:'priority'
        },
        BUS_NUMBER_PLATE_DETECTION:{
                BUS_ENTRANCE:'entrance',
                BUS_DEPARTURE:'exit'
        }
}
module.exports={
        constants:constants
}