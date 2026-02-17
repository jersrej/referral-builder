import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1771314411169 implements MigrationInterface {
    name = 'Init1771314411169'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`referral\` ADD \`phone\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`referral\` ADD \`homeNumber\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`referral\` ADD \`street\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`referral\` ADD \`suburb\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`referral\` ADD \`state\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`referral\` ADD \`postcode\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`referral\` ADD \`country\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`referral\` ADD \`avatarUrl\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`referral\` DROP COLUMN \`avatarUrl\``);
        await queryRunner.query(`ALTER TABLE \`referral\` DROP COLUMN \`country\``);
        await queryRunner.query(`ALTER TABLE \`referral\` DROP COLUMN \`postcode\``);
        await queryRunner.query(`ALTER TABLE \`referral\` DROP COLUMN \`state\``);
        await queryRunner.query(`ALTER TABLE \`referral\` DROP COLUMN \`suburb\``);
        await queryRunner.query(`ALTER TABLE \`referral\` DROP COLUMN \`street\``);
        await queryRunner.query(`ALTER TABLE \`referral\` DROP COLUMN \`homeNumber\``);
        await queryRunner.query(`ALTER TABLE \`referral\` DROP COLUMN \`phone\``);
    }

}
