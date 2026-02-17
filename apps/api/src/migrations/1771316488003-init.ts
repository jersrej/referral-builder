import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1771316488003 implements MigrationInterface {
    name = 'Init1771316488003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`referral\` (\`id\` varchar(36) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`homeNumber\` varchar(255) NOT NULL, \`street\` varchar(255) NOT NULL, \`suburb\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`postcode\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`avatarUrl\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_1008d0eb98eea167695c724fbb\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_1008d0eb98eea167695c724fbb\` ON \`referral\``);
        await queryRunner.query(`DROP TABLE \`referral\``);
    }

}
