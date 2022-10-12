import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm"

@Entity('universities')
export class University {
    @ObjectIdColumn()
    _id: ObjectID

    @Column()
    name: string
    
    @Column()
    country: string
    
    @Column()
    alpha_two_code: string
    
    @Column({nullable:true})
    'state-province': Array<string>
    
    @Column({nullable:true})
    web_pages: Array<string>

    @Column({nullable:true})
    domains: Array<string>

}
