import { prisma } from '../src/lib/prisma';

const images: Record<string, string> = {
    tarjetas_clasicas: 'https://cdn.leonardo.ai/users/fd18c734-c077-458b-895b-bf8b47fc16c8/generations/e4c9a1da-3d05-4170-aabf-81ff6cec728f/Default_Professional_product_photography_stack_of_matte_white_0.jpg',
    tarjetas_laminadas: 'https://cdn.leonardo.ai/users/fd18c734-c077-458b-895b-bf8b47fc16c8/generations/0acbaeed-0db5-4add-9b0b-b6eb2f4fcf69/Default_Professional_product_photography_business_cards_with_m_0.jpg',
    tarjetas_exclusivas: 'https://cdn.leonardo.ai/users/fd18c734-c077-458b-895b-bf8b47fc16c8/generations/6f1fc580-338c-40fe-b915-a1b2416e5517/Default_Product_photography_of_premium_business_cards_with_spe_0.jpg',
    brochure_21x10: 'https://cdn.leonardo.ai/users/fd18c734-c077-458b-895b-bf8b47fc16c8/generations/509c02f3-0f21-4e51-aecb-ee0524e2aaea/Default_Professional_photography_of_folded_brochure_elongated_0.jpg',
    flyers_a6: 'https://cdn.leonardo.ai/users/fd18c734-c077-458b-895b-bf8b47fc16c8/generations/fa0dbdfb-bf51-4a10-94de-977327a334f8/Default_Product_photography_of_flyers_A6_format_105x148mm_on_l_0.jpg',
    flyers_a5: 'https://cdn.leonardo.ai/users/fd18c734-c077-458b-895b-bf8b47fc16c8/generations/cfc5f84d-3a9b-4283-b6cf-3279c64cbd90/Default_Professional_photography_of_A5_flyers_148x210mm_on_whi_0.jpg',
    flyers_a4: 'https://cdn.leonardo.ai/users/fd18c734-c077-458b-895b-bf8b47fc16c8/generations/23085703-46c6-47d2-86fd-5051584defae/Default_Product_photography_of_A4_format_flyer_210x297mm_on_de_0.jpg',
    tripticos_a4: 'https://cdn.leonardo.ai/users/fd18c734-c077-458b-895b-bf8b47fc16c8/generations/b16ef44d-d15d-4b6e-8e7f-ae743f0e61ab/Default_Photography_of_A4_format_trifold_brochure_3_panels_on_0.jpg',
    tripticos_a3: 'https://cdn.leonardo.ai/users/fd18c734-c077-458b-895b-bf8b47fc16c8/generations/c8952fe1-4912-460e-bf51-7eee65e3c9bf/Default_Photography_of_A3_format_trifolding_brochure_large_for_0.jpg',
    lona_frontlit: 'https://cdn.leonardo.ai/users/fd18c734-c077-458b-895b-bf8b47fc16c8/generations/53e5ba4a-4027-4706-a31a-862642c30660/Default_Product_photography_of_450gr_frontlit_advertising_bann_0.jpg',
    lona_backlit: 'https://cdn.leonardo.ai/users/fd18c734-c077-458b-895b-bf8b47fc16c8/generations/c04ba74b-4b60-4349-af0d-cf9f79c8ea0d/Default_Photography_of_backlit_retroilluminated_banner_for_lig_0.jpg',
    lona_mesh: 'https://cdn.leonardo.ai/users/fd18c734-c077-458b-895b-bf8b47fc16c8/generations/fc306feb-7d5b-4b0b-b012-8fa9b2eee9cd/Default_Photography_of_microperforated_mesh_banner_for_constru_0.jpg',
    vinilo_interior: 'https://cdn.leonardo.ai/users/fd18c734-c077-458b-895b-bf8b47fc16c8/generations/1aed3dce-abab-48ad-852b-4f6cbcaf7f25/Default_Product_photography_of_transparent_adhesive_vinyl_appl_0.jpg',
    vinilo_exterior: 'https://cdn.leonardo.ai/users/fd18c734-c077-458b-895b-bf8b47fc16c8/generations/38c18482-8510-4159-810b-67497b7ee640/Default_Product_photography_of_longlasting_vinyl_for_exterior_0.jpg',
    lona_pvc: 'https://cdn.leonardo.ai/users/fd18c734-c077-458b-895b-bf8b47fc16c8/generations/fd525cc3-c3bc-4c9f-98c0-adde84d7b761/Default_Product_photography_of_resistant_500gr_PVC_banner_for_0.jpg',
    forex: 'https://cdn.leonardo.ai/users/fd18c734-c077-458b-895b-bf8b47fc16c8/generations/ed7caee6-cfbf-4483-9cbe-2d7c5755b8d0/Default_Product_photography_of_5mm_Forex_foam_PVC_panel_White_0.jpg',
    metacrilato: 'https://cdn.leonardo.ai/users/fd18c734-c077-458b-895b-bf8b47fc16c8/generations/bc857608-9327-49dd-8a6c-3a896695b0cc/Default_Product_photography_of_10mm_clear_acrylic_PMMA_sheet_V_0.jpg',
    carton_balsa: 'https://cdn.leonardo.ai/users/fd18c734-c077-458b-895b-bf8b47fc16c8/generations/96e1a296-0b5a-4cdf-9c6f-d094fa613953/Default_Product_photography_of_lightweight_balsa_cardboard_for_0.jpg',
    rollup: 'https://cdn.leonardo.ai/users/fd18c734-c077-458b-895b-bf8b47fc16c8/generations/98e37f69-9667-4322-8689-57f6d903a85e/Default_Professional_photograph_of_Rollup_system_deployable_ba_0.jpg',
    panel_composite: 'https://cdn.leonardo.ai/users/fd18c734-c077-458b-895b-bf8b47fc16c8/generations/1d7d1af6-c20d-4fd6-aaf6-124ce30097a7/Default_Product_photography_of_3mm_Composite_Panel_Aluminum_Di_0.jpg',
    vinilo_perforado: 'https://cdn.leonardo.ai/users/fd18c734-c077-458b-895b-bf8b47fc16c8/generations/19fc31f9-b284-4b12-8d94-4094ceca79aa/Default_Product_photography_of_microperforated_vinyl_oneway_vi_0.jpg'
};

async function main() {
    for (const [key, imagen] of Object.entries(images)) {
        await prisma.producto.update({
            where: { clave: key },
            data: { imagen }
        });
        console.log('✅ Actualizado:', key);
    }
    console.log('🎉 Base de datos actualizada con las URLs de las imágenes');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
