import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1771313058868 implements MigrationInterface {
    name = 'Init1771313058868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`referral\` (\`id\` varchar(36) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_1008d0eb98eea167695c724fbb\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_1008d0eb98eea167695c724fbb\` ON \`referral\``);
        await queryRunner.query(`DROP TABLE \`referral\``);
    }

}
