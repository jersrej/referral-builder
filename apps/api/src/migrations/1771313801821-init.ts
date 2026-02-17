import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1771313801821 implements MigrationInterface {
    name = 'Init1771313801821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`referral\` ADD \`deletedAt\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`referral\` DROP COLUMN \`deletedAt\``);
    }

}
